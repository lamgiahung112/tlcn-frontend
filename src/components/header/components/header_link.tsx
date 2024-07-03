import {Link} from "react-router-dom";

interface HeaderLinkProps {
    to: string;
    title: string;
}

function HeaderLink(props: HeaderLinkProps) {
    return <div className="cursor-pointer group h-full flex items-center">
        <Link className="color-black font-bold text-lg group-hover:text-blue-500" to={props.to}>{props.title}</Link>
    </div>
}

export default HeaderLink;