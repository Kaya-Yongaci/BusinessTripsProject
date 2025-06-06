export default function tripsReducer(wishlist, action) {
    switch (action.type) {
        case "empty":
            return [];
        case "add":

        {
            // destructuring the trip properties from action
            // extracting the values id, title, description, startTrip, endTrip from action.trip
            const {id, title, description, startTrip, endTrip} = action.trip;
            const itemInWishlist = wishlist.find((item) => item.id === id);
            if (itemInWishlist) {
                // Return new array with the matching item replace
                return wishlist.map((item) =>
                    item.id === id? {
                            ...item, // spread operator to copy existing properties
                            title,  // update title with the new value, etc.
                            description,
                            startTrip,
                            endTrip,
                        }
                        : item
                );
            } else {
                // Return new array with the new item appended
                console.log("appending new item to wishlist");
                // destructuring the trip properties from action
                // returning a new array with the new item added
                return [...wishlist, {id, title, description, startTrip, endTrip}];
            }
        }

        case "deleteItem": {
            // destructuring the id from action
            const { id } = action;
            const indexToRemove = wishlist.findIndex(item => item.id === id);

            if (indexToRemove === -1) {
                // Item not found, return the original state (or handle the error)
                return wishlist; // Or throw an error, log a message, etc.
            }

            // Create a new array without modifying the original
            const newArray = [
                // Spread the elements before the item to remove, spread before the item to remove
                ...wishlist.slice(0, indexToRemove),
                // Skip the item to remove add the rest of the array, spread after the item to remove
                ...wishlist.slice(indexToRemove + 1)
            ];

            return newArray;
        }
        default:
            throw new Error("Unhandled action: " + action.type);
    }
}
