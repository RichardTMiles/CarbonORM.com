import getStyles from "api/hoc/getStyles";
import store from "pages/UI/Bootstrap/AdminLTE/store/store";
import {Outlet} from 'react-router-dom';
import {Provider} from 'react-redux';
import ControlSidebar from './Bootstrap/AdminLTE/modules/main/control-sidebar/ControlSidebar';
import Header from './Bootstrap/AdminLTE/modules/main/header/Header';
import MenuSidebar from './Bootstrap/AdminLTE/modules/main/menu-sidebar/MenuSidebar';
import Footer from './Bootstrap/AdminLTE/modules/main/footer/Footer';
export const ADMIN_LTE = 'AdminLTE/';


const AdminLTE = () => {

    console.log('AdminLTE Rendered');

    const styles = getStyles()

    return <div className={"wrapper"}>
            <Header/>

            <MenuSidebar/>

            <div className={"content-wrapper"}>
                <div className={styles.pt3}/>
                <section className="content">
                    <Outlet/>
                </section>
            </div>
            <Footer/>
            <ControlSidebar/>
        </div>
};

const AdminLTEWithStore = () => {
    return <Provider store={store}>
        <AdminLTE/>
    </Provider>
}

export default AdminLTEWithStore
