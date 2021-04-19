module.exports = class Admin_page {
    print(req, res) {
        res.render('admin/admin_page', { formInscription: {} });
    }

}