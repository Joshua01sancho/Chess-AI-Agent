//import importservice from "src/controllers/importservice.js";
//import exportservice from "src/controllers/exportservice.js";

class Checkers {
	//XXX: START OF => Properties
   #piecesWhite;
	#piecesBlack;
	#turn;
	#kingMoves;
	#piecesSquarePairingBlack;
	#piecesSquarePairingWhite;
	#playableSquares;
	//XXX: END OF => Properties
   
   //XXX: START OF => Contructor
	constructor() {
		this.#piecesWhite = 20;
		this.#piecesBlack = 20;
		this.#turn = "white";
		this.#kingMoves = 25;
		this.#piecesSquarePairingBlack = new Map((function () {
			let pairing = [];
			let pieceId = 1;
			let squareId = 2;
			let onNextLine = 1;
			for (let i = 0; i <= 3; i = i + 1) {
				for (let j = 0; j <= 4; j = j + 1) {
					pairing.push([pieceId, [squareId ,0 ]]);
					pieceId = pieceId + 1;
	                 if (j === 4) {
	                     squareId = squareId + onNextLine;
	                 } else {
	 					squareId = squareId + 2;
	                 }
				}
				if (onNextLine === 1) {
					onNextLine = 3;
				} else if (onNextLine === 3) {
	                 onNextLine = 1;
	             }
			}
			return pairing;
		})()
		);
		this.#piecesSquarePairingWhite = new Map((function () {
			let pairing = [];
			let pieceId = 21;
			let squareId = 62;
			let onNextLine = 1;
			for (let i = 0; i <= 3; i = i + 1) {
				for (let j = 0; j <= 4; j = j + 1) {
					pairing.push([pieceId, [squareId ,0 ]]);
					pieceId = pieceId + 1;
	                 if (j === 4) {
	                     squareId = squareId + onNextLine;
	                 } else {
	 					squareId = squareId + 2;
	                 }
				}
				if (onNextLine === 1) {
					onNextLine = 3;
				} else if (onNextLine === 3) {
	                 onNextLine = 1;
	             }
			}
			return pairing;
		})()
		);
		this.#playableSquares = (function () {
			let catchArray = [];
			let squareId = 2;
			let onNextLine = 1;
			for (let i = 0; i <= 9; i = i + 1) {
				for (let j = 0; j <= 4; j = j + 1) {
					catchArray.push(squareId);
					if (j === 4) {
						squareId = squareId + onNextLine;
					} else {
						squareId = squareId + 2;
					}
				}
				if (onNextLine === 1) {
					onNextLine = 3;
				} else if (onNextLine === 3) {
	                 onNextLine = 1;
	             }
			}
			return catchArray;
		})();
	}
	//XXX: END OF => Contructor

	//XXX: START OF => Accessors
	get piecesBlack () {
		return this.#piecesBlack;
	}
	
	set piecesBlack (n) {
		if (n === -1) {
			this.#piecesBlack = this.#piecesBlack + n;
		}
	}
	
	get piecesWhite () {
		return this.#piecesWhite;
	}
	
	set piecesWhite (n) {
		if (n === -1) {
			this.#piecesWhite = this.#piecesWhite + n;
		}
	}
	
	get turn () {
		return this.#turn;
	}
	
	set turn (n) {
		if (this.#turn === "white" && n === "black") {
			this.#turn = "black";
		} else if (this.#turn === "black" && n === "white") {
			this.#turn = "white";
		} 
	}

	get kingMoves () {
		return this.#kingMoves;
	}
	
	set kingMoves (n) {
		if (n === -1) {
			this.#kingMoves = this.#kingMoves + n;
		}
	}
	
	get playableSquares () {
		return this.#playableSquares;
	}

	getPiecesSquarePairingBlack (pieceId) {
		return this.#piecesSquarePairingBlack.get(pieceId);
	}
	
	setPieceBlackKing (pieceId) {
		if (pieceId > 0 && pieceId < 21) {
			let pieceArray = this.#piecesSquarePairingBlack.get(pieceId);
			if (pieceArray[1] === 0) {
				pieceArray[1] = 1;
				this.#piecesSquarePairingBlack.set(pieceId, pieceArray);
			}
		}
	}
	
	setPieceBlackSquare (pieceId, squareId) {
		if ((pieceId > 0 && pieceId < 21) && (this.playableSquares.includes(squareId))) {
			let pieceArray = this.#piecesSquarePairingBlack.get(pieceId);
			pieceArray[0] = squareId;
			this.#piecesSquarePairingBlack.set(pieceId, pieceArray);
		}
	}
	
	
	getPiecesSquarePairingWhite (pieceId) {
		return this.#piecesSquarePairingWhite.get(pieceId);
	}
	
	setPieceWhiteKing (pieceId) {
		if (pieceId > 20 && pieceId < 41) {
			let pieceArray = this.#piecesSquarePairingWhite.get(pieceId);
			if (pieceArray[1] === 0) {
				pieceArray[1] = 1;
				this.#piecesSquarePairingWhite.set(pieceId, pieceArray);
			}
		}
	}
	
	setPieceWhiteSquare (pieceId, squareId) {
		if ((pieceId > 20 && pieceId < 41) && (this.playableSquares.includes(squareId))) {
			let pieceArray = this.#piecesSquarePairingWhite.get(pieceId);
			pieceArray[0] = squareId;
			this.#piecesSquarePairingWhite.set(pieceId, pieceArray);
		}
	}

	removePiece (pieceId) {
		if (pieceId < 21) {
				let pieceArray = this.#piecesSquarePairingBlack.get(pieceId);
				pieceArray[0] = 0;
				this.#piecesSquarePairingBlack.set(pieceId, pieceArray);
		} else if (pieceId < 41) {
				let pieceArray = this.#piecesSquarePairingWhite.get(pieceId);
				pieceArray[0] = 0;
				this.#piecesSquarePairingWhite.set(pieceId, pieceArray);
			}
	}
	//XXX: END OF => Accessors
	
	//XXX: START OF => Methods
	piece (pieceId, method) {
		var thisInstance = this;
		
		function occupies(pieceId) {
			var pairing;
			if (pieceId >= 1 && pieceId <= 20) {
				pairing = thisInstance.getPiecesSquarePairingBlack(pieceId);
				return pairing[0];
			} else if (pieceId >= 21 && pieceId <= 40) {
				pairing = thisInstance.getPiecesSquarePairingWhite(pieceId);
				return pairing[0];
			} else {
				return -1; //pieceId is not valid
			}
		}

		function hasMoves(pieceId) {
			var pieceMoves = moves(pieceId);
			if (pieceMoves.length === 4) {
				if (	pieceMoves.includes("tl1") || 
						pieceMoves.includes("tr1") || 
						pieceMoves.includes("br1") || 
						pieceMoves.includes("bl1") 	) {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		 }

		function moves(pieceId) { //FIXME: Some logic error(s)
			if (pieceId >= 1 && pieceId <= 40) {
				var si = occupies(pieceId);
				console.log(occupies(pieceId)); //XXX
				var si11;
				var si22;
				var i = 0;
				var manRestriction = 0;
				var arrayMoves = [];
				var iteretionSwitch = function (iteretion) {
					if (iteretion === 0) {
						si11 = thisInstance.square(si - 11, "occupantType");
						si22 = thisInstance.square(si - 22, "occupantType");
					} else if (iteretion === 1) {
						si11 = thisInstance.square(si - 9, "occupantType");
						si22 = thisInstance.square(si - 18, "occupantType");
					} else if (iteretion === 2) {
						si11 = thisInstance.square(si + 11, "occupantType");
						si22 = thisInstance.square(si + 22, "occupantType");
					} else if (iteretion === 3) {
						si11 = thisInstance.square(si + 9, "occupantType");
						si22 = thisInstance.square(si + 18, "occupantType");
					}
				};
				var push_xx0 =  function () {
					if (i === 0) {
					arrayMoves.push("tl0");
					} else if (i === 1) {
					arrayMoves.push("tr0");
					} else if (i === 2) {
					arrayMoves.push("br0");
					} else if (i === 3) {
					arrayMoves.push("bl0");
					}
					manRestriction = 0;
					si = occupies(pieceId);
					i = i + 1;
				};
				var push_xx1 =  function () {
					if (i === 0) {
					arrayMoves.push("tl1");
					} else if (i === 1) {
					arrayMoves.push("tr1");
					} else if (i === 2) {
					arrayMoves.push("br1");
					} else if (i === 3) {
					arrayMoves.push("bl1");
					}
					manRestriction = 0;
					si = occupies(pieceId); 
					i = i + 1;
				};
				var push_squareId =  function () {
					if (i === 0) {//Top-Left
						si = si - 11;
					} else if (i === 1) {//Top-Right
						si = si - 9;
					} else if (i === 2) {//Bottom-Right
						si = si + 11;
					} else if (i === 3) {//Bottom-Left
						si = si + 9;
					}
					arrayMoves.push(si);
				};
				//XXX: NOTE => b = 1; w = 2; . = 3; e = 4
				
				while (i <= 3) {// 4 iteretions
					if (i === 0) {//XXX: START OF => Top-left diagonal
						iteretionSwitch(i);
						if ((si11 === "manBlack") || (si11 === "kingBlack")) {
							si11 = 1;
						} else if ((si11 === "manWhite") || (si11 === "kingWhite")) {
							si11 = 2;
						} else if (si11 === "none") {
							si11 = 3;
						} else {
							push_xx0();
							continue; //To next diagonal
						}
						
						if ((si22 === "manBlack") || (si22 === "kingBlack")) {
							si22 = 1;
						} else if ((si22 === "manWhite") || (si22 === "kingWhite")) {
							si22 = 2;
						} else if (si22 === "none") {
							si22 = 3;
						} else {
							si22 = 12;
						}
						
						var pieceType = thisInstance.square(thisInstance.piece(pieceId, "occupies"),"occupantType");
						if (pieceType === "manBlack" || pieceType === "manWhite" ) {
							if (manRestriction === 1) {
								push_xx0();
								continue;//To next diagonal
							}
						}
						
						if (((si11 * si11) + si22) <= 6) {
							if (pieceId <= 20) { //if black piece
							push_xx0();
							continue;  //To next diagonal
							} else { //if white piece
								if (((si11 * si11) + si22) <= 3) {
									push_xx0();
									continue;  //To next diagonal
								} else if (((si11 * si11) + si22) === 4) {
									push_xx1();
									continue;  //To next diagonal
								} else if (((si11 * si11) + si22) <= 6) {
									push_xx0();
									continue;  //To next diagonal
								}
							}
						} else if (((si11 * si11) + si22) === 7) {
							if (pieceId <= 20) { //if black piece
								push_xx1();
								continue;  //To next diagonal
							} else { //if white piece
								push_xx0();
								continue;  //To next diagonal
							}
							
						} else if (((si11 * si11) + si22) <= 12) {
							if (pieceType === "manBlack") {//manBlack restrictioon
								push_xx0();
								continue;  //To next diagonal
							} else {
								push_squareId();
							}
						} else if (((si11 * si11) + si22) <= 16) {
							push_xx0();
							continue;  //To next diagonal
						} else if (((si11 * si11) + si22) === 21) {
							if (pieceType === "manBlack") {//manBlack restrictioon
								push_xx0();
								continue;  //To next diagonal
							} else {
								push_squareId();
							}
						}
						manRestriction = manRestriction + 1;
					//XXX: END OF => Top-left diagonal
					} else if (i === 1) {//XXX: START OF => Top-right diagonal
						iteretionSwitch(i);
						if ((si11 === "manBlack") || (si11 === "kingBlack")) {
							si11 = 1;
						} else if ((si11 === "manWhite") || (si11 === "kingWhite")) {
							si11 = 2;
						} else if (si11 === "none") {
							si11 = 3;
						} else {
							push_xx0();
							continue; //To next diagonal
						}
						
						if ((si22 === "manBlack") || (si22 === "kingBlack")) {
							si22 = 1;
						} else if ((si22 === "manWhite") || (si22 === "kingWhite")) {
							si22 = 2;
						} else if (si22 === "none") {
							si22 = 3;
						} else {
							si22 = 12;
						}		
										
						var pieceType = thisInstance.square(thisInstance.piece(pieceId, "occupies"),"occupantType");
						if (pieceType === "manBlack" || pieceType === "manWhite" ) {
							if (manRestriction === 1) {
								push_xx0();
								continue;//To next diagonal
							}
						}
						
						if (((si11 * si11) + si22) <= 6) {
							if (pieceId <= 20) { //if black piece
							push_xx0();
							continue;  //To next diagonal
							} else { //if white piece
								if (((si11 * si11) + si22) <= 3) {
									push_xx0();
									continue;  //To next diagonal
								} else if (((si11 * si11) + si22) === 4) {
									push_xx1();
									continue;  //To next diagonal
								} else if (((si11 * si11) + si22) <= 6) {
									push_xx0();
									continue;  //To next diagonal
								}
							}
						} else if (((si11 * si11) + si22) === 7) {
							if (pieceId <= 20) { //if black piece
								push_xx1();
								continue;  //To next diagonal
							} else { //if white piece
								push_xx0();
								continue;  //To next diagonal
							}
							
						} else if (((si11 * si11) + si22) <= 12) {
							if (pieceType === "manBlack") {//manBlack restrictioon
								push_xx0();
								continue;  //To next diagonal
							} else {
								push_squareId();
							}
						} else if (((si11 * si11) + si22) <= 16) {
							push_xx0();
							continue;  //To next diagonal
						} else if (((si11 * si11) + si22) === 21) {
							if (pieceType === "manBlack") {//manBlack restrictioon
								push_xx0();
								continue;  //To next diagonal
							} else {
								push_squareId();
							}
						}
						manRestriction = manRestriction + 1;
					//XXX: END OF => Top-right diagonal
					} else if (i === 2) {//XXX: START OF => Bottom-right diagonal
						iteretionSwitch(i);
						if ((si11 === "manBlack") || (si11 === "kingBlack")) {
							si11 = 1;
						} else if ((si11 === "manWhite") || (si11 === "kingWhite")) {
							si11 = 2;
						} else if (si11 === "none") {
							si11 = 3;
						} else {
							push_xx0();
							continue; //To next diagonal
						}
						
						if ((si22 === "manBlack") || (si22 === "kingBlack")) {
							si22 = 1;
						} else if ((si22 === "manWhite") || (si22 === "kingWhite")) {
							si22 = 2;
						} else if (si22 === "none") {
							si22 = 3;
						} else {
							si22 = 12;
						}		
								
						var pieceType = thisInstance.square(thisInstance.piece(pieceId, "occupies"),"occupantType");
						if (pieceType === "manBlack" || pieceType === "manWhite" ) {
							if (manRestriction === 1) {
								push_xx0();
								continue;//To next diagonal
							}
						}
						
						if (((si11 * si11) + si22) <= 6) {
							if (pieceId <= 20) { //if black piece
							push_xx0();
							continue;  //To next diagonal
							} else { //if white piece
								if (((si11 * si11) + si22) <= 3) {
									push_xx0();
									continue;  //To next diagonal
								} else if (((si11 * si11) + si22) === 4) {
									push_xx1();
									continue;  //To next diagonal
								} else if (((si11 * si11) + si22) <= 6) {
									push_xx0();
									continue;  //To next diagonal
								}
							}
						} else if (((si11 * si11) + si22) === 7) {
							if (pieceId <= 20) { //if black piece
								push_xx1();
								continue;  //To next diagonal
							} else { //if white piece
								push_xx0();
								continue;  //To next diagonal
							}
							
						} else if (((si11 * si11) + si22) <= 12) {
							if (pieceType === "manWhite") {//manWhite restrictioon
								push_xx0();
								continue;  //To next diagonal
							} else {
								push_squareId();
							}
						} else if (((si11 * si11) + si22) <= 16) {
							push_xx0();
							continue;  //To next diagonal
						} else if (((si11 * si11) + si22) === 21) {
							if (pieceType === "manWhite") {//manWhite restrictioon
								push_xx0();
								continue;  //To next diagonal
							} else {
								push_squareId();
							}
						}
						manRestriction = manRestriction + 1;
					//XXX: END OF => Bottom-right diagonal
					} else {//XXX: START OF => Bottom-left diagonal
						iteretionSwitch(i);
						if ((si11 === "manBlack") || (si11 === "kingBlack")) {
							si11 = 1;
						} else if ((si11 === "manWhite") || (si11 === "kingWhite")) {
							si11 = 2;
						} else if (si11 === "none") {
							si11 = 3;
						} else {
							push_xx0();
							continue; //To next diagonal
						}
						
						if ((si22 === "manBlack") || (si22 === "kingBlack")) {
							si22 = 1;
						} else if ((si22 === "manWhite") || (si22 === "kingWhite")) {
							si22 = 2;
						} else if (si22 === "none") {
							si22 = 3;
						} else {
							si22 = 12;
						}	
							
						var pieceType = thisInstance.square(thisInstance.piece(pieceId, "occupies"),"occupantType");
						if (pieceType === "manBlack" || pieceType === "manWhite" ) {
							if (manRestriction === 1) {
								push_xx0();
								continue;//To next diagonal
							}
						}
						
						if (((si11 * si11) + si22) <= 6) {
							if (pieceId <= 20) { //if black piece
							push_xx0();
							continue;  //To next diagonal
							} else { //if white piece
								if (((si11 * si11) + si22) <= 3) {
									push_xx0();
									continue;  //To next diagonal
								} else if (((si11 * si11) + si22) === 4) {
									push_xx1();
									continue;  //To next diagonal
								} else if (((si11 * si11) + si22) <= 6) {
									push_xx0();
									continue;  //To next diagonal
								}
							}
						} else if (((si11 * si11) + si22) === 7) {
							if (pieceId <= 20) { //if black piece
								push_xx1();
								continue;  //To next diagonal
							} else { //if white piece
								push_xx0();
								continue;  //To next diagonal
							}
							
						} else if (((si11 * si11) + si22) <= 12) {
							if (pieceType === "manWhite") {//manWhite restrictioon
								push_xx0();
								continue;  //To next diagonal
							} else {
								push_squareId();
							}
						} else if (((si11 * si11) + si22) <= 16) {
							push_xx0();
							continue;  //To next diagonal
						} else if (((si11 * si11) + si22) === 21) {
							if (pieceType === "manWhite") {//manWhite restrictioon
								push_xx0();
								continue;  //To next diagonal
							} else {
								push_squareId();
							}
						}
						manRestriction = manRestriction + 1;
					//XXX: END OF => Bottom-left diagonal
					} 
				}
				return arrayMoves;
			} else {
				return -1;
			}
		} //XXX: END OF => moves
		
		if (method === "occupies") {
			return occupies(pieceId);
		} else if (method === "hasMoves") {
			return hasMoves(pieceId);
		}  else if (method === "moves") {
			return moves(pieceId);
		}
	}

	move (squareId01, squareId02) {
		var thisInstance = this;
		var backRowBlack = [2, 4, 6, 8, 10];
		var backRowWhite = [91, 93, 95, 97, 99];
		if (thisInstance.state() === "ongoing") {
			var pieceId = thisInstance.square(squareId01,"occupantId");
			var PieceBelongsTo = pieceId <= 20 ? "black" : "white";
			if ((PieceBelongsTo === thisInstance.turn) && thisInstance.playableSquares.includes(squareId02)) {
				var arrayMoves = piece(pieceId, "moves");
				if (arrayMoves.includes(squareId02)) {
					if (pieceId <= 20) {
						if (thisInstance.square(squareId01, "occupantType") === "manBlack") {
							if (backRowWhite.includes(squareId02)) {
								thisInstance.setPieceBlackKing(pieceId);
							}
						}
						thisInstance.setPieceBlackSquare(pieceId, squareId02);
						thisInstance.turn = "white";
						return 1; //successful
					} else {
						if (thisInstance.square(squareId01, "occupantType") === "manWhite") {
							if (backRowBlack.includes(squareId02)) {
								thisInstance.setPieceBlackKing(pieceId);
							}
						}
						thisInstance.setPieceWhiteSquare(pieceId, squareId02);
						thisInstance.turn = "black";
						return 1; //successful
					}
				}	
			} else {
				return 0; //Move cannot be made or is not valid.
			}
		} else {
			return -1; //The game is over, check state() for detials.
		}
	}

	playing (method = "turn") {
		var thisInstance = this;
		function hasMoves() {
			var pieceId; var n;
		
			if (thisInstance.turn === "white") {
				pieceId = 21; n = 41;
			} else {
				pieceId = 1; n = 21;
			}
		
			for (pieceId; pieceId < n; pieceId = pieceId + 1) {
				if (thisInstance.piece(pieceId,  "hasMoves") === true) {
					return true; //
				}
			}
			return false;
		}
		
		if (method === "turn") {
			return thisInstance.turn;
		} else if (method === "hasMoves") {
			return hasMoves();
		}
	}

	square (squareId, method) {
		var thisInstance = this;
		function occupantId(squareId) {
			if (thisInstance.playableSquares.includes(squareId)) {
				var pairingBlack;
				var pairingWhite;
				for (let i = 1; i <= 40; i = i + 1) {
					if (i <= 20) {
					pairingBlack = thisInstance.getPiecesSquarePairingBlack(i);
						if (squareId === pairingBlack[0]) {
							return i; //square is occupied by i
						}
					} else {
					pairingWhite = thisInstance.getPiecesSquarePairingWhite(i);
						if (squareId === pairingWhite[0]) {
						return i; //square is occupied by i
						}	
					}
				}
				return 0; //square is unoccupied
			} else {
				return -1; //squareId provided is not valid
			}
		}
		
		function occupantType(squareId) {
			if (thisInstance.playableSquares.includes(squareId)) {
				var pairingBlack;
				var pairingWhite;
				for (let i = 1; i <= 40; i = i + 1) {
					if (i <= 20) {
					pairingBlack = thisInstance.getPiecesSquarePairingBlack(i);
						if (squareId === pairingBlack[0]) {
							if (pairingBlack[1] === 1) {
								return "kingBlack";
							} else {
								return "manBlack";
							}
						}
					} else {
					pairingWhite = thisInstance.getPiecesSquarePairingWhite(i);
						if (squareId === pairingWhite[0]) {
						if (pairingWhite[1] === 1) {
								return "kingWhite";
							} else {
								return "manWhite";
							}
						}	
					}
				}
				return "none";
			} else {
				return -1; //squareId provided is not valid
			}
		}
		
		if (method === "occupantId") {
			return occupantId(squareId);
		} else if (method === "occupantType") {
			return occupantType(squareId);
		}
	}

	state () {
		var thisInstance = this;
		if (thisInstance.piecesWhite <= 0) {
			return "winBlack";
		} else if (thisInstance.piecesBlack <= 0) {
			return "winWhite";
		} else if (thisInstance.playing("hasMoves") === false) {
			if (thisInstance.turn === "black") {
				return "winWhite";
			} else {
				return "winBlack";
			}
		} else if (thisInstance.kingMoves <= 0) {
			return "draw";
		} else {
			return "ongoing";
		}
	}
	//XXX: END OF => Methods
}


