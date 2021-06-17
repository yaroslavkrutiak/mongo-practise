# mongo-practise

### Installation
1. Clone repo
2. Open project directory
3. run ```npm install``` command
3. run ```node app.js``` command

### Data sample

User document sample:
````
{
    firstName:  'Andrew',
    lastName: 'Rayan',
    department: 'a',
    createdAt: new Date()
}
````


Article document sample:
````
{
    name:  'Mongodb - introduction',
    description: 'Mongodb - text',
    type: 'a',
    tags: []
}
````


### Tasks

#### Users
````
- Create 2 users per department (a, b, c)
- Delete 1 user from department (a)
- Update firstName for users from department (b)
- Find all users from department (c)
````

#### Articles
````
- Create 5 articles per each type (a, b, c)
- Find articles with type a, and update tag list with next value [‘tag1-a’, ‘tag2-a’, ‘tag3’]
- Add tags [‘tag2’, ‘tag3’, ‘super’] to other articles except articles from type a
- Find all articles that contains tags [tag2, tag1-a]
- Pull [tag2, tag1-a] from all articles
````
