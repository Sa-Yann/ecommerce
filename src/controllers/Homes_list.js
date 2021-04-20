let repoSellers = require('../repository/Sellers.js');

module.exports = class HomeListClass {
    print(request, response) {
        response.render('admin/list/list_homeView')
    }
};