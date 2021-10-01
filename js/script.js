let userInfo
let userRepositories

async function getUser(event) {
    event.preventDefault()

    const url = new URL(document.URL);
    const user = url.searchParams.get("user");
    userInfo = await fetch(`https://api.github.com/users/${user}`)
        .then((response) => response.json())
        .catch((error) => console.log(error))

    getRepositories(user);
    getUserInfo(userInfo);
}

async function getRepositories(user) {
    userRepositories = await fetch(`https://api.github.com/users/${user}/repos`)
        .then((response) => response.json())
        .catch((error) => console.log(error))
    getUserRepos(userRepositories)
}

function goBack() {
    window.location.href = "../index.html"
}

function getUserInfo(user) {
    document.getElementById('avatar_url').src = user.avatar_url ? user.avatar_url : 'Não definido';
    document.getElementById('name').innerHTML = user.name ? user.name : 'Não definido';
    document.getElementById('login').innerHTML = user.login ? user.login : 'Não definido';
    document.getElementById('type').innerHTML = user.type ? user.type : 'Não definido';
    document.getElementById('html_url').href = user.html_url ? user.html_url : 'Não definido';
    document.getElementById('html_url').innerHTML = user.html_url;
    document.getElementById('company').innerHTML = user.company ? user.company : 'Não definido';
    document.getElementById('blog').innerHTML = user.blog ? user.blog : 'Não definido';
    document.getElementById('location').innerHTML = user.location ? user.location : 'Não definido';
    document.getElementById('email').innerHTML = user.email ? user.email : 'Não definido';
    document.getElementById('bio').innerHTML = user.bio ? user.bio : 'Não definido';
    document.getElementById('public_repos').innerHTML = user.public_repos ? user.public_repos : 'Não definido';
    document.getElementById('followers').innerHTML = user.followers ? user.followers : 'Não definido';
    document.getElementById('following').innerHTML = user.following ? user.following : 'Não definido';
    document.getElementById('created_at').innerHTML = user.created_at ? user.created_at : 'Não definido';
    document.getElementById('updated_at').innerHTML = user.updated_at ? user.updated_at : 'Não definido';
}

async function getUserRepos(userRepositories) {
    userRepositories.forEach(({
        name,
        description,
        language,
        homepage,
        svn_url
    }) => {
        console.log({
            name,
            description,
            language,
            homepage,
            svn_url
        })
        let container = document.createElement("ul");

        const repoName = `<li>Nome: <span>${name ? name : 'Não definido'}</span></li>`;
        const repoDescription = `<li>Descrição: <span>${description ? description : 'Não definido'}</span></li>`;
        const repoMainLanguage = `<li>Linguagem Principal: <span>${language ? language : 'Não definido'}</span></li>`;
        const repoHomepage = `<li>Página de Visualização: <a href=${homepage} target="_blank">${homepage ? homepage : 'Não definido'}</a></li>`;
        const repoSvn = `<li>Página do Projeto no GitHub: <a href=${svn_url} target="_blank">${svn_url ? svn_url : 'Não definido'}</a></li>`;


        const url = new URL(document.URL);
        const user = url.searchParams.get("user");

        fetch(`https://api.github.com/repos/${user}/${name}/languages`)
            .then((response) => response.json())
            .then((data) => {
                const repoLanguages = `<li>Linguages usadas: <span>${Object.getOwnPropertyNames(data).join(', ')}</span></li>`;
                container.innerHTML = repoName + repoDescription + repoMainLanguage + repoHomepage + repoSvn + repoLanguages;
                document.getElementById("repositories").appendChild(container);
            })
            .catch((error) => console.log(error))
    });
}






