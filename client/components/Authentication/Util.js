const apiRequest = async (route = '', options = {}) => new Promise((resolve, reject) => fetch(route, options)
  .then((res) => {
    if (res.status === 401) {
      window.location.href = '/login';
      // window.history.pushState(null, null, '/login');
      return reject(res);
    }
    return resolve(res);
  }).catch((e) => reject(e)));

export default apiRequest;
