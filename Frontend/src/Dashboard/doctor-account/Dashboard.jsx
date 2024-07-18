import Loader from '../../components/Loader/Loading.jsx'
import Error from '../../components/Error/Error.jsx'
import useGetProfile from '../../hooks/useFetchData.js'
import { BASE_URL } from '../../config.js'
import Tabs from './Tabs.jsx'


const Dashboard = () => {
    const {data, loading, error} = useGetProfile(`${BASE_URL}/doctors/profile/me`);
    return(
        <section>
            <div className='max-w-[1170px] px-5 mx-auto'>
                {loading && !error && <Loader/>}
                {error && !loading && <Error/>}
                {!loading && !error && (
                    <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px] '>
                        <Tabs/>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Dashboard;