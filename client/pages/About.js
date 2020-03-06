import React from "react";

function About() {
  return (
    <div className="about">
      <h1>About us</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam in, ea
        voluptatem dolorum, expedita impedit odio autem saepe labore et facere
        quos, similique voluptates quo est ut dolorem officia sapiente.
        Temporibus beatae ut cumque iure rerum voluptatibus, qui iste eum
        accusantium tenetur illo explicabo nihil quis a perferendis quam quae
        deleniti culpa, nemo ipsum dolorem inventore quasi sint voluptates?
        Nobis. Totam nisi cupiditate ducimus doloribus vero facilis ex
        excepturi, sit nemo! Accusantium dignissimos ratione perferendis quod
        odio, rerum maxime dolorum optio tempore eligendi temporibus itaque
        facere quo dicta. Possimus, tempore. Voluptate facere dignissimos,
        excepturi eveniet distinctio deleniti a nihil soluta in officiis hic
        doloremque nemo ex eaque sed? Dolorum, earum incidunt recusandae
        molestiae quo quaerat aperiam officia autem. Voluptas, asperiores!
        Tenetur sit quasi quidem optio, enim aspernatur quas odio numquam
        ratione nesciunt harum laboriosam ut excepturi perferendis id
        voluptatibus? Rerum totam obcaecati voluptates debitis pariatur,
        distinctio necessitatibus molestias doloremque commodi. Corporis quaerat
        dolores accusamus assumenda consequatur earum commodi, nostrum possimus
        accusantium modi quibusdam dignissimos unde perferendis ab? Error labore
        mollitia voluptas voluptatem, minima voluptatum molestias odit modi
        laboriosam iure ratione!
      </p>

      <div className="row">
        <div className="col s12 m7">
          <div className="card">
            <div className="card-image">
              <img src="/images/alien.png" alt="alien" />
              <span className="card-title">Card Title</span>
            </div>
            <div className="card-content">
              <p>
                I am a very simple card. I am good at containing small bits of
                information. I am convenient because I require little markup to
                use effectively.
              </p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about {
          text-align: center;
        }
        img {
          max-width: 150px;
          height: 200px;
          display: block;
          margin: auto;
        }
      `}</style>
    </div>
  );
}

export default About;
