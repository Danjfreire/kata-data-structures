export default function two_crystal_balls(breaks: boolean[]): number {
    const jumpAmount = Math.floor(Math.sqrt(breaks.length));

    let floor = jumpAmount;
    while (floor < breaks.length) {
        if (breaks[floor]) {
            break;
        }
        floor += jumpAmount;
    }

    const breaksAt = floor;
    floor -= jumpAmount;

    while (floor < breaksAt) {
        if (breaks[floor]) {
            return floor;
        }
        floor++;
    }

    return -1;
}
