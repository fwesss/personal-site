[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Release](https://github.com/fwesss/personal-site/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/fwesss/personal-site/actions/workflows/main.yml)

# Portfolio

This is the site for my portfolio where I can showcase my work and provide some
information about myself and how to contact me.

I had put off making a portfolio for a long time but it felt like a disservice
to myself. It's hard to sell oneself as a web developer when there's personal
website to point to and pointing to Github profile isn't necessarily what
everyone is looking for. This site serves as a place to show my work.

## Demo

https://www.wesfeller.dev/

## Features

- Light/dark mode toggle
- D3 Visualization
- Responsive
- Accessible

## Tech Stack

TypeScript, Next.js, React, Chakra-UI, D3, Sanity.io

## Lessons Learned

### D3 Force + React

This challenge is back again. It was much easier this time but I ran into a
performance issue that took longer than it should have to fix.

#### How The Bubbles Work

I wanted a visualization that was purely decorative, but not distracting. The
original idea was bubbles connected to each other by links they move around
somehow. They should not leave the boundaries of the page and the simulation
should avoid becoming stale.

A number of nodes are generated based on the size of the page (not viewport). A
random size and coordinate are assigned to each node. A linking function will
then generate a random number of links based on the size of the page. Not every
node will be linked and some nodes may have many links. The linking function
randomly assigns a node to each end of the link.

##### Forces

There are number of forces at work in the simulation.

###### Link

The linking force is the pull between nodes connected by a link. Links nodes
will either move away or closer to each other until the distance between them
matches the links' assigned distance.

###### Collide

The bubbles will not overlap and have an invisible barrier around them that
pushes other nodes away.

###### Many Body

All nodes will push each other away. Larger bodies of nodes will have more push
force.

###### Boundary

Nodes will not leave the canvas. There is a barrier just shy of the screen edge
that they will not pass.

##### Avoiding Entropy

To avoid nodes wandering their way to edges and laying themselves out in a
border along the screen, nodes are randomly re-linked every 7.5 seconds. This
keeps them all moving away or towards each other in different directions and
keeps everything moving along.

This is where we our bug comes from.

#### The Memory Leak

I had pushed the branch to production and showed my wife before I realized that
something wasn't right. It worked perfectly when I had been testing it but when
I had left the tab open for a few minutes, I found that the site had slowed to a
crawl and I was running at about 5fps. I refreshed and it was back to 60fps like
it was when I tested it.

I pulled up the performance tab in Firefox and saw predictable drops in
performance every 7.5 seconds. This had to be my re-linking function. I pulled
up the memory tab in Chrome and took a snapshot of the heap after a while and
could see dozens of allocations for timers which must have been due to the D3's
simulation.

Every 7.5 seconds, a reLink flag switched to true and because it was a
dependency in my useEffect running the simulation, the simulation would re-run,
then set flag back to false. This is exactly what I wanted to happen.

What I did not understand was that every time the simulation ran, it actually
created a new instance of the simulation. Those timers were all internal to the
force functions it was calling.

#### Clean Up Your Listeners

The solution to this problem was to clean up the simulation in the useEffect
return. I don't use the return in a useEffect often so it wasn't immediately
obvious. As soon as I added, performance shot back up and I felt like I knew
what I was doing once again.

## Acknowledgements

This is my favorite website and her articles on D3 are extremely helpful and
easy to follow. I highly recommend anyone who has an interest in D3 or
visualizations to check out her site and book.

- [Amelia Wattenberger's Blog](https://wattenberger.com/blog)
