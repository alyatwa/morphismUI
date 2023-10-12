export const getRandomColor = () => {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }