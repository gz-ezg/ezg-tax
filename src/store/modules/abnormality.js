const abnormality = {
    namespaced: true,
    state: {
        companyname:"",
        mobile: "",
        name: "",
        detail: {
            tax: [],
            business: []
        }
    },
    mutations: {
        update_companyname (state, companyname) {
            state.companyname = companyname
        },
        update_mobile (state, mobile) {
            state.mobile = mobile
        },
        update_name (state, name) {
            state.name = name
        },
        update_detail (state, detail) {
            state.detail = detail
        }
    },
    actions: {
        update_companyname (context, companyname) {
            context.commit('update_companyname', companyname)
        },
        update_mobile (context, mobile) {
            context.commit('update_mobile', mobile)
        },
        update_name (context, name) {
            context.commit('update_name', name)
        },
        update_detail(context, detail){
            context.commit('update_detail', detail)
        }
    },
}

export default abnormality;