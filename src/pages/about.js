import React from 'react'
import { MainContainer } from '../components/styles'

const About = () => {
  return (
    <MainContainer>
      <h1>About Me</h1>

      <img
        src="./profile-pic.jpg"
        alt="Vimalraj Selvam"
        style={{
          marginTop: '20px',
          marginBottom: '20px',
          width: '230px',
          borderRadius: '10px',
          border: '1px solid white'
        }}
      />

      <p>
        I started off my career as an occasional coder. Writing code excited me.
        Building UI's gave me the feel of a creator. I took to exploring UI a
        bit more seriously.
      </p>

      <p>
        My work took me through some interesting turns and in the process, I
        learnt automation as well. Worked on building some automation frameworks
        in Java for a brief stint.
      </p>

      <p>
        But my love for UI never vanished. Eventually I have now evolved into
        what the industry calls as a "Full stack developer".
      </p>

      <p>
        I specialize in different technologies like Javascript, Java, Python
      </p>

      <p>
        At work, I am involved in building reliability/monitoring systems. For
        building them I get to play with Kafka, Prometheus, Bosun, OpenTSDB,
        M3Db, Redis, MySQL, MongoDb, Golang, GraphQL, Spark, Hadoop Clusters and
        so on.
      </p>

      <p>
        I have discovered a new found love for Open source and web development.
        I am a Selenium and Appium enthusiast and try to chime in occasionally
        into TestNG as well through bug fixes.
      </p>

      <p>
        At home, when personal life gives me some free time, I work on building
        my own pet projects that I open source to the community.
      </p>

      <p>
        This site is all about sharing what I have learnt. You will get to hear
        about things that made me curious, some nifty hacks that I learnt to do
        some stuff (or) at other times, all those things I learnt the hard way
        by making mistakes.
      </p>

      <p>My intent is to share my learnings and learn from others as well.</p>

      <p>
        My sincere hope is that my posts helps you in some way or the other.
      </p>

      <p>
        If you would like to share some feedback, or want me to write about
        something that you feel is important, please do reach out to me. You
        know what they say… “The best motivation comes from a few kind words of
        encouragement” !
      </p>
    </MainContainer>
  )
}

export default About
