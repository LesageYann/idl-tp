class Labyrinthe extends Environment {
  constructor( x, y, toric ) {
    super( x, y, toric );
    this._wallPositions = this.createLabyrinthe();
  }

  setSMA(sma){
    super.setSMA(sma);
    for (var index = 0; index <   this._wallPositions.length; index++) {
      var pos =   this._wallPositions[index];
      this.addAgent(createAgent('Wall', pos.x, pos.y, this), true);
    }
  }

  addAgent(agent, force) {
    if(force || !(agent instanceof Wall))
      super.addAgent(agent);
  }

  createLabyrinthe () {
    //Initialisation des variables utilisées dans le code
    var xMax = this._x;
    var yMax = this._y;

    var map = new Array(xMax);
    var pile = new Array();
    var x, y, k, l, temp, fin, nbVoisins, dir;
    var voisins = new Array(4);

    // Comme le calcul va être fait de nombreuses fois, on stocke le tout
    var maxTailleMax = xMax - 1;

    //On définit les bordures horizontales et on
    for (x = 0; x < xMax; x++) {
      //Nécessaire en JS pour gérer les tableaux à 2 dimensions
      map[x] = new Array(xMax);
      map[0][x] = map[x][0] = 2;
    }

    //Generation du reste du labyrinthe
    for (y = 2; y < yMax; y = y + 2) {
      for (x = 2; x < xMax; x = x + 2) {
        map[x][y - 1] = 2;
        map[x - 1][y] = 2;
        map[x][y] = 2;

      }
    }
    // Coordonnées aléatoire du début du chemin
    temp = Math.floor((xMax - 2) / 2);
    x = Math.floor(Math.random() * temp) * 2 + 1;
    y = Math.floor(Math.random() * temp) * 2 + 1;
    do {
      fin = false;
      while (!fin) {
        map[x][y] = 1;
        //Recherche des voisins libres
        nbVoisins = 0; //Dans un premier temps, aucun voisin n'a été trouvé
        //On test chaque case voisine, si la case est vide, on stocke sa direction dans un tableau
        if (( y - 2 >= 1) && ( map[x][y - 2] != 1 ))               voisins[nbVoisins++] = 0;
        if (( y + 2 <= maxTailleMax) && ( map[x][y + 2] != 1 ))    voisins[nbVoisins++] = 2;
        if (( x + 2 <= maxTailleMax) && ( map[x + 2][y] != 1 ))    voisins[nbVoisins++] = 1;
        if (( x - 2 >= 1) && ( map[x - 2][y] != 1 ))               voisins[nbVoisins++] = 3;

        //Si aucun voisin libre n'a été trouvé, on s'arrête là
        if (nbVoisins == 0)fin = true;

        //Sinon, on cherche la prochaine case à visiter
        else {
          //Initialisation de la future direction de la case
          k = l = 0;
          //On empile le contexte de la case actuelle, pour revenir dessus ensuite
          pile.push(x);
          pile.push(y);
          //On choisit une direction selon celles stockées précédemment dans le tableau
          dir = voisins[Math.floor(Math.random() * nbVoisins)];
          switch (dir) {
            case 0 :
              l -= 2;
              break;
            case 1 :
              k += 2;
              break;
            case 2 :
              l += 2;
              break;
            case 3 :
              k -= 2;
              break;
            default :
              break;
          }
          //On retire le mur situé entre l'ancienne et la nouvelle case
          map[x + k / 2][y + l / 2] = 0;
          //On redéfinit les coordonnées de la case courante
          x += k;
          y += l;
        }
      }
      //Dans la mesure ou auncun voisin n'a été trouvé, on dépile afin de repartir
      //sur une autre case précédemment visitée
      y = pile.pop();
      x = pile.pop();
    }
    while (pile[0]);


    //Définition du départ et arrivée du laby
    map[1][1] = 3;
    map[xMax - 2][maxTailleMax] = 4;
    return this.getLabyrinthPositions(map);
  };

  getLabyrinthPositions(map) {
    var positions = [];
    for (var y = 0; y < this._y; y++) {
      for (var x = 0; x < this._x; x++) {
        // Utilisation d'un switch, plus pratique qu'une indexation
        // lors de la présence de cas particuliers
        if (map[x][y] == 2) {
          positions.push({x: x, y: y});
        }
      }
    }
    return positions;
  };

}
