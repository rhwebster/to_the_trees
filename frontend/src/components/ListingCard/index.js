import { useParams } from 'react-router-dom';

const ListingCard = ({ listing }) => {
    const Listing = ({ aListing }) => {
        return (
            <div>
                <h3>{aListing.name}</h3>
                <img src={aListing.picUrl}></img>
            </div>
        );
    };
}

export default ListingCard;