
## 2021 - Notion clone - ReactJs , NodeJs , JWT auth , PostgreSQL with Sequelize , Flask API , Microservices.

![image](https://github.com/user-attachments/assets/f9805896-d45e-4f21-b5be-8a603048922e)

https://res.cloudinary.com/dezoqwmss/video/upload/v1678556861/notion_clone/notion_clone_-_Google_Chrome_2023-03-11_17-41-58_fyeuwn.mp4


The project is split into seperate services with Docker compose for microservices or as a monolithic app with all services running on seperate ports.

notion front_end ( react , contextAPI )
server ( python , flask )

I love the UX and easability of notion so building my own rich-text-editor with the react state management was a great project to tackle. Learning content-editable divs was a challenge especially having to inject and change state. I had a hard time pruning \n and other tags when grabbing the event value and replacing inside a div. But, with content editable divs I had the ability to produce a 

- heading, paragraph, bullet-point, image
- bookmark view of links which required python to scrape for the title, image and description.

A history feature was implemented by saving the state to an array on any new change. I did run into an issue where I forgot about needing to deep clone every object within the array for any state change to not affect the previous history. And that’s obviously due to object referencing.

I Used React context for the state management and learned a more modular and cleaner approach to the folder structure of my code. 

The project is split into separate services with Docker compose for microservices or as a monolithic app with all services running on separate ports.
