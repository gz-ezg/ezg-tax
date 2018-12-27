const project = {
    namespaced: true,
    state: {
        companyname:"",
        name: "",
        tel: "",
        userid: ""
    },
    mutations: {
        update_companyname (state, companyname) {
            state.companyname = companyname
        },
        update_name (state, name) {
            state.name = name
        },
        update_tel (state, tel) {
            state.tel = tel
        },
        update_userid (state, userid) {
            state.userid = userid
        },
    },
    actions: {
        update_companyname (context, companyname) {
            context.commit('update_companyname', companyname)
        },
        update_name (context, name) {
            context.commit('update_name', name)
        },
        update_tel (context, tel) {
            context.commit('update_tel', tel)
        },
        update_userid (context, userid) {
            context.commit('update_userid', userid)
        },
    },
}

export default project;