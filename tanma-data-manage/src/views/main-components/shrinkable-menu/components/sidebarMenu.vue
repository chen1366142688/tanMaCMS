<style lang="less">
    @import '../styles/menu.less';
</style>

<template>
    <Menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList">
            <MenuItem class="menu_line_top" :id="item.children[0].name" v-if="item.children.length<=0 || item.name == 'indexManage'" :name="item.children[0].name" :key="item.path">
                <Icon :type="item.icon"  :size="iconSize" :key="item.path"></Icon>
                <span class="layout-text" :key="item.path">{{ itemTitle(item) }}</span>
            </MenuItem>
            <Submenu v-if="item.children.length > 0 && item.name != 'indexManage'" :name="item.name" :key="item.path">
                <template slot="title">
                    <Icon :type="item.icon" size="20"></Icon>
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :id="child.name" :name="child.name" :key="child.name">
                        <Icon :type="child.icon" :size="iconSize" :key="child.name"></Icon>
                        <span class="layout-text" :key="child.name">{{ child.title }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        changeMenu (active) {
            this.$emit('on-change', active);
            setTimeout(() => {
                if(document.getElementById(active) != null && document.getElementById(active) != undefined && document.getElementById(active)  != 'undefined'){
                     if(active == "page_index"){
                        document.getElementById(active).className="ivu-menu-item ivu-menu-item-selected menu_line_top";
                    }else{
                        document.getElementById(active).className="ivu-menu-item ivu-menu-item-selected menu_line";
                    }
                    document.getElementById(active).style.backgroundColor="#00c693";
                    document.getElementById(active).style.color="#fff";
                }
            }, 100)
        },
        itemTitle (item) {
            if(item.name == 'baseConfig'){
                item.icon = 'ios-gear-outline';
            }else if(item.name == 'classManage'){
                item.icon = 'clipboard';
            }else if(item.name == 'accountManage'){
                item.icon = 'social-yen-outline';
            }else if(item.name == 'studentManage'){
                item.icon = 'android-person';
            }else if(item.name == 'coachManage'){
                item.icon = 'person';
            }else if(item.name == 'schoolManage'){
                item.icon = 'android-home';
            }
            
            if(item.children != null && item.children.length > 0){
                for(let i=0;i<item.children.length;i++){
                    let childre = item.children[i];
                    setTimeout(() => {
                        if(document.getElementById(childre.name) != null){
                            if(childre.name == "page_index"){
                                document.getElementById(childre.name).className="ivu-menu-item ivu-menu-item-selected menu_line_top";
                            }else{
                                document.getElementById(childre.name).className="ivu-menu-item ivu-menu-item-selected menu_line";
                            }
                            document.getElementById(childre.name).style.backgroundColor="#00c693";
                            document.getElementById(childre.name).style.color="rgba(255, 255, 255, 0.7)";
                        }
                    }, 0)
                }
            }

            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        }
    },
    created(){
        let menuListRes = new Array();
        if(sessionStorage.getItem('menuList') != null && sessionStorage.getItem('menuList') != ''){
            menuListRes = sessionStorage.getItem('menuList').split(",");
        }
        var data = new Map();
        if(menuListRes != null && menuListRes.length > 0){
            for(let i=0;i<menuListRes.length;i++){
                data.set(menuListRes[i],1);
            }
        }
        for(let i=0;i< this.menuList.length; i ++){            
            if(data.get(this.menuList[i].name) != 1){
                this.menuList.splice(i,1);
                i--;
            }else{
                for(let j=0;j<this.menuList[i].children.length;j++){
                    if(data.get(this.menuList[i].children[j].name) != 1){
                        this.menuList[i].children.splice(j,1);
                        j--;
                    }
                }
                if(this.menuList[i].children.length==0){
                    this.menuList.splice(i,1);
                    i--;
                }
            }
        }
        this.changeMenu("page_index");
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>
