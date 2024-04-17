import React from 'react';
import "../Styles/About.css"

const About = () => {
  return (
    <div className='about-wrapper'>
      <div className='about-wrapper-body'>
      <h1 className='about-header'>About Me</h1>
      <div className='about-me-text'>
        <p>My name is Timothy Natal. I'm a 24 year old web developer from New York 
            with a love for technology, video games, basketball and dogs.
            My favorite NBA Team is the New York Knicks.
        </p>
      </div>
      <div className="github-link-wrap">
        <h2>GitHub Repository</h2>
        <a href="http://github.com/TimNatal1887" target="_blank" rel="noopener noreferrer" className='githubt-img-link'>
            <img src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png" className='github-img'></img>
        </a>
      </div>
      </div>
    </div>
  );
};

export default About;
