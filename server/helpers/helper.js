const helpers = {};

helpers.get_color_for_user = (name) => {
<<<<<<< HEAD
    // This is taken from twitch's js and slightly modified
    const defaultColors = [
        ['Red', '#FF0000'],
        ['Blue', '#0000FF'],
        ['Green', '#00FF00'],
        ['FireBrick', '#B22222'],
        ['Coral', '#FF7F50'],
        ['YellowGreen', '#9ACD32'],
        ['OrangeRed', '#FF4500'],
        ['SeaGreen', '#2E8B57'],
        ['GoldenRod', '#DAA520'],
        ['Chocolate', '#D2691E'],
        ['CadetBlue', '#5F9EA0'],
        ['DodgerBlue', '#1E90FF'],
        ['HotPink', '#FF69B4'],
        ['BlueViolet', '#8A2BE2'],
        ['SpringGreen', '#00FF7F']];
    const n = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
    const color = defaultColors[n % defaultColors.length][1];
    return color;
};
=======
   //This is taken from twitch's js and slightly modified
   let  default_colors = [
            ["Red", "#FF0000"],
            ["Blue", "#0000FF"],
            ["Green", "#00FF00"],
            ["FireBrick", "#B22222"],
            ["Coral", "#FF7F50"],
            ["YellowGreen", "#9ACD32"],
            ["OrangeRed", "#FF4500"],
            ["SeaGreen", "#2E8B57"],
            ["GoldenRod", "#DAA520"],
            ["Chocolate", "#D2691E"],
            ["CadetBlue", "#5F9EA0"],
            ["DodgerBlue", "#1E90FF"],
            ["HotPink", "#FF69B4"],
            ["BlueViolet", "#8A2BE2"],
            ["SpringGreen", "#00FF7F"]];
            let color;
            let n = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
            color = default_colors[n % default_colors.length][1]
            return color;
}
>>>>>>> 2af8af657a41031cd27b9e5212e85b1953db85ea

module.exports = helpers;
