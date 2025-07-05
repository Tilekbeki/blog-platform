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

  const sentResource = async (url, parameters, typeReq = 'POST') => {
    try {
        const response = await fetch(url, {
        method: typeReq,
        body: JSON.stringify(parameters),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
        },
        });

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
        console.log(person)
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
        console.log('sada',newOBJ)
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
        const person = {
            user:userData,
        };
        console.log(person)
        let info  = await sentResource(url, person, 'PUT');
        let image = await getProfile('',info.user.username);
        let newOBJ = {...info.user, ...image.user}
        return newOBJ;
    }

    const getArticles = async (pageNumber=1) => {
        let offset = pageNumber*5;
        console.log('offset', offset);
        const url = `${_BASE_URL}/articles?limit=${5}&offset=${pageNumber}`;
        console.log('сработал')
        console.log(await getResource(url))
        const response = await getResource(url);
        return response.articles
    };

    const getArticle = async (slug) => {
        const url = `${_BASE_URL}/articles/${slug}`;
        console.log(await getResource(url))
        const response = await getResource(url);
        return response.article
    } 

    return {
        registeration, 
        login,
        getProfile,
        getArticles,
        getArticle,
        updateUser,
        getUserInfo
    }
}

export default blogService;