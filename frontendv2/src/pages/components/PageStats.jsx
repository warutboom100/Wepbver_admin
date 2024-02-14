import HeartIcon  from '@heroicons/react/24/outline/HeartIcon'
import BoltIcon  from '@heroicons/react/24/outline/BoltIcon'


function PageStats({ Pop ,Used}){
    return(
        <div className="stats bg-base-100 shadow">
  
  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <HeartIcon className='w-8 h-8'/>
    </div>
    <div className="stat-title">Popular Location</div>
    <div className="stat-value">{Pop}</div>
    <div className="stat-desc">-</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <BoltIcon className='w-8 h-8'/>
    </div>
    <div className="stat-title">Total used</div>
    <div className="stat-value">{Used}</div>
    <div className="stat-desc">14% more than last month</div>
  </div>
</div>
    )
}

export default PageStats