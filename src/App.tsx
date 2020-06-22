import React from 'react'
import Axios from 'axios'

type State = {
  postTitles: string[]
}

const Url = 'https://dev.to'

class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    this.setState({
      postTitles: []
    })
  }

  onSubmit = () => {
    this.getArticles()
      .then((response) => {
        if (response.status === 200) {
          const html = new DOMParser().parseFromString(response.data, 'text/html')
          const posts = html
            .getElementById('articles-list')
            ?.getElementsByClassName('substories')[0]
            ?.getElementsByClassName('crayons-story')

          if (posts) {
            let i = 0
            const postsLength = posts.length
            let postTitles: string[] = []

            while (i < postsLength) {
              const post = posts.item(i)

              const title = post
                ?.getElementsByClassName('crayons-story__title')
                ?.item(0)
                ?.getElementsByTagName('a')
                ?.item(0)
                ?.text

              if (title) {
                postTitles = [
                  ...postTitles,
                  title
                ]
              }

              i++
            }

            this.setState({
              postTitles: postTitles
            })
          }
        }
      }).catch((error) => {
        console.error(error)
    })
  }

  getArticles = () => {
    return Axios.get(Url)
  }

  render() {
    const postTitles = this.state?.postTitles

    return (
      <>
        <p>Welcome</p>
        <input type="button" value="Get articles" onClick={ this.onSubmit }/>
        {
          (postTitles && postTitles.length) && postTitles.map((title, index) => <div key={index}>{ title }</div>)
        }
      </>
    );
  }
}

export default App;
