const blogService = () => {
    const _BASE_URL = 'https://blog-platform.kata.academy/api/';
    
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

  const sentResource = async (url, parameters) => {
    try {
        const response = await fetch(url, {
        method: 'POST',
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
        return newOBJ;
    };

    const getProfile = async (username) => {
        const url = `${_BASE_URL}/profiles/${username}`;
        return await getResource(url);
    };

    const getArticles = async (length=5, offset=5) => {
        const url = `${_BASE_URL}/articles?limit=${length}&offset=${offset}`;
        console.log('сработал')
        console.log(await getResource(url))
        const response = await getResource(url);
        return response.articles
    } 

    return {
        registeration, 
        login,
        getProfile,
        getArticles
    }
}

export default blogService;