import "./Content.css";
import ImageUpload from "./ImageUpload.js";


function Content() {
    return (
    <div className="container">
    <section>
        <h2>About This Web App</h2>
        <p>Farmers and Gardeners spend a lot of time identifying weeds near their plants. This process can be extremely time consuming and tedious if their farm or garden is large. This Weed Identifier will solve this problem by using machine learning to quickly differentiate weeds from crops.
</p>
    </section>
    <section>
        <h2>How to Use</h2>
        <p>Simply upload your image by clicking the button</p>
    </section>
   <ImageUpload/>
    </div>
    );
}

export default Content;