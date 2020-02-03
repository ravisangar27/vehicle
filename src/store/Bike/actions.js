

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
       return  `https://my-json-server.typicode.com/WAMaurice/rest-db-for-frontend/bikes`;
    }, 

    fetchById({ dispatch, commit}, bike) { 
        dispatch('url').then((url) => {
            window.axios
                .get(url+'/'+bike.id)
                .then(({ data }) => { 
                    bike.loader.hide();
                    commit('refreshById', data); 
                });
        });
    },
};