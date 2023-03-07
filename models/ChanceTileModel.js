class ChanceTile extends Tile {
    constructor(id, picture, chanceText){
        super('Chance', id); //Should this be name so that we can give each chance card it's own name
        this.chanceText = chanceText;
        this.picture = picture;
    }
}