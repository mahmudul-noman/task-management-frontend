
import { NavLink } from 'react-router-dom';

const ActiveLink = ({ to, children }) => {
    return (
        <div>
            <NavLink to={to} className={({ isActive }) => isActive ? "text-base tracking-widest uppercase font-extrabold text-purple-600" : "text-base tracking-widest uppercase font-semibold text-[#666]"}>
                {children}
            </NavLink>
        </div>
    );
};

export default ActiveLink;