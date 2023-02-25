document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchValue = document.querySelector('input#search').value
    fetch('https://api.github.com/search/users?q=' + searchValue, {
      method: 'GET',
      headers: {
        Accept: "application/vnd.github.v3+json"
      }
    })
      .then(res => res.json())
      .then(dataGit => appendToList(dataGit))
    form.reset()
  })
})

function appendToList(data) {
  const userList = document.querySelector('ul#user-list')

  for (item in data.items) {
    individualItem = data.items[item]
    const newUser = document.createElement('li')
    const newUserTitle = document.createElement('h2')
    newUserTitle.textContent = individualItem.login
    newUserTitle.addEventListener('click', function (e) {

      fetch(`https://api.github.com/users/${e.target.innerText}/repos`)
        .then(res => res.json())
        .then(function (data2) {

          for (item2 in data2) {
            const listOfRepos = document.createElement('li')
            eachItem = data2[item2]
            listOfRepos.innerText = `${eachItem.name}`
            newUser.appendChild(listOfRepos)
          }
        })

    })



    newUser.append(newUserTitle)
    const newUserInfo = document.createElement('li')
    newUserInfo.innerHTML = `
    <img src = '${individualItem.avatar_url}'>
    <p><a href= '${individualItem.html_url}'>${individualItem.login}'s Profile</a><p>Click on username to see a list of repos below.</p></p>`

    newUser.appendChild(newUserInfo)
    userList.appendChild(newUser)

  }
}
