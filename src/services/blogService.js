const blogService = () => {
    const _BASE_URL = 'https://blog-platform.kata.academy/api/';
    
    const getResource = async (url) => {
    try {
      const response = await fetch(`${_BASE_URL}${url}`)
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

        return await sentResource(url, person);
    }

    const login = async (argumentsss) => {
        const url = `${_BASE_URL}/users/login`
        const person = {
            user: argumentsss,
        };

        return await sentResource(url, person);
    };

    return {
        registeration, 
        login
    }
}

export default blogService;