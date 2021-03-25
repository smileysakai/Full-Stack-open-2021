import React from 'react'

const Header = (props) => {
  //console.log(props.course)
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  //console.log(props.parts[0])
  //console.log(props)
  const { parts } = props
  return (
    <>
      {parts.map( (part) => {
       /* console.log(part.id)*/
        return (
            <div key ={part.id}>
              <Part part = {part} />
            </div>
          )
      })}
      <Total part = {parts} />
    </>
  )
}

const Total = (props) => {
  const {part} = props    
  /*console.log(part)
  console.log(part.exercises)*/
  return(
    <>
      <div><strong>total of {part.reduce((sum, partexe) => sum + partexe.exercises, 0)} exercises</strong></div>
    </>
  )
}

const Part = (props) => {
  const { part } = props
  return(
    <>
      <p>{part.name} {part.exercises}</p>
    </>
  )
}

const Course = (props) => {
  const { courses } = props
  //console.log(courses)
  /*return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </> 
  )*/
  return (
    <>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
          </div>
        )
      })}
    </>
  )
}

export default Course