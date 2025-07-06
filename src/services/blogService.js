const blogService = () => {
    const _BASE_URL = 'https://blog-platform.kata.academy/api';
    
    const getResource = async (url) => {
    try {
      const response = await fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error(err));
      return response;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      throw error;
    }
  };

  const sentResource = async (url, parameters, typeReq = 'POST', token) => {
    try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      ...(token && { Authorization: `Token ${token}` }),
    };

    const config = {
      method: typeReq,
      headers,
    };

    // Только добавляем тело, если это не GET/HEAD
    if (parameters) {
      config.body = JSON.stringify(parameters);
    }

    const response = await fetch(url, config);

        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
    };


    const registeration = async (userData) => {
        const url = `${_BASE_URL}/users`;
        const person = {
            user:userData,
        };
        let info  = await sentResource(url, person);
        let image = await getProfile(info.user.username);
        let newOBJ = {...info.user, ...image.profile}
        return newOBJ;
    }

    const login = async (argumentsss) => {
        const url = `${_BASE_URL}/users/login`
        const person = {
            user: argumentsss,
        };

        let info  = await sentResource(url, person);
        let image = await getProfile(info.user.username);
        let newOBJ = {...info.user, ...image.profile}
        return newOBJ;
    };

    const getProfile = async (username) => {
        const url = `${_BASE_URL}/profiles/${username}`;
        return await getResource(url);
    };

    const getUserInfo = async (token) => {
        const url = `${_BASE_URL}/user`;
        try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
            },
        });

        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userInfo = await response.json();
        return userInfo.user; 
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
    }

    const updateUser = async (userData) => {
        const url = `${_BASE_URL}/user`;
        const token = localStorage.getItem('jwtToken')
        const person = {
            user:userData,
        };
        let info  = await sentResource(url, person, 'PUT', token);
        let newOBJ = {...info.user}
        return newOBJ;
    }

    const getArticles = async (pageNumber=1) => {
        let offset = pageNumber*5;
        const url = `${_BASE_URL}/articles?limit=${5}&offset=${pageNumber}`;
        const response = await getResource(url);
        return response.articles
    };

    const getArticle = async (slug) => {
        const url = `${_BASE_URL}/articles/${slug}`;
        const response = await getResource(url);
        console.log(response)
        return response.article
    } 
    const createArticle = async (articleData) => {
        const article = {
            article: articleData
        }
        const url = `${_BASE_URL}/articles`;
        const token = localStorage.getItem('jwtToken')
        const response = await sentResource(url, article, 'POST', token);
        return response.article
    } 
    const updateArticle = async (articleData) => {
        const {slug,...otherData} = articleData;
        const article = {
            article: otherData
        }
        console.log(article)
        const url = `${_BASE_URL}/articles/${slug}`;
        const token = localStorage.getItem('jwtToken')
        const response = await sentResource(url, article, 'PUT', token);
        console.log('все', response.article);
        return response.article
    } 

    const deleteArticle = async (slug) => {
        const url = `${_BASE_URL}/articles/${slug}`;
        const token = localStorage.getItem('jwtToken')
        const response = await sentResource(url, '', 'DELETE', token);
        console.log('все', response.article)
        return response.article
    } 

    const likeArticle = async (slug) => {
        const url = `${_BASE_URL}/articles/${slug}/favorite`;
        const token = localStorage.getItem('jwtToken')
        console.log('все', slug)
        const response = await sentResource(url, '', 'POST', token);
        console.log('лайк', response)
        return response.article
    } 

    const unLikeArticle = async (slug) => {
        const url = `${_BASE_URL}/articles/${slug}/favorite`;
        const token = localStorage.getItem('jwtToken');
        const response = await sentResource(url, '', 'DELETE', token);
        console.log('все', response.article)
        return response.article
    } 

    return {
        registeration, 
        login,
        getProfile,
        getArticles,
        getArticle,
        updateUser,
        getUserInfo,
        createArticle,
        updateArticle,
        deleteArticle,
        likeArticle,
        unLikeArticle
    }
}

export default blogService;