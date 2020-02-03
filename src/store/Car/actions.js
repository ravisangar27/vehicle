

export default {
    fetch({ dispatch, commit}, loader) { 
        dispatch('url').then((url) => {
            window.axios
                .get(url)
                .then(({ data }) => { 
                    loader.loader.hide();
                    commit('refresh', data); 
                });
        });
    },
 
    url() {
       return  `https://my-json-server.typicode.com/WAMaurice/rest-db-for-frontend/cars`;
    }, 

    fetchById({ dispatch, commit}, car) { 
        dispatch('url').then((url) => {
            window.axios
                .get(url+'/'+car.id)
                .then(({ data }) => { 
                    car.loader.hide();
                    commit('refreshById', data); 
                });
        });
    },
};