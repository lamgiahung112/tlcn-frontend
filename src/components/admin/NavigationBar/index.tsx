import {Link} from "react-router-dom";

function NavigationBar() {
  return (
    <div className="h-minus-header bg-red-300 p-4 flex-shrink-0">
      <div className="text-2xl font-medium text-white mb-4">YAMAHA ADMIN</div>
      <div className="text-white flex flex-col gap-y-2">
          <Link to="/admin/motorbikes">Motorbikes</Link>
          <Link to="/admin/media">Media Resources</Link>
      </div>
    </div>
  );
}

export default NavigationBar;
