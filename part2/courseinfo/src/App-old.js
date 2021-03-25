import React from 'react'


const Header = (props) => {
  console.log("hello",props)
  const { course } = props
  return (
    <>
      {course.map( innercourse =>
        <h1>
          {innercourse.name}
        </h1>
      )}
    </>
  )
}
/*
const Content = (props) => {
  console.log(props.parts[0])
  const contents= parts.map(part => part)
  console.log("hello",contents)
  const key = props.key
  return(
    <>
      {parts.map(part => 
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      )}
    </>

    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </div>   
  )
}
*/

const Total = (props) => {
  return(
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}


const Part = (props) => {
  return(
    <>
      <p>{props.part} {props.exercise}</p>
    </>
  )
}


const Course = (props) => {  
  const { course } = props
  course.map( (course) => {
    console.log(course.id)
    console.log(course.name)
    return (
      <>
        <p>{course.id}</p>
      </>
    )
  })
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course course={courses} />
}

export default App