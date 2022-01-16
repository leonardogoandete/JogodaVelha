// TIC TAC TOE
const tic_tac_toe = {

    // ATTRIBUTES
    board: ['','','','','','','','',''],
    jogadorXvitorias: 0,
    jogadorOvitorias: 0,
    partidas: 0,
    simbols: {
                options: ['O','X'],
                turn_index: 0,
                change: function(){
                    this.turn_index = ( this.turn_index === 0 ? 1:0 );
                }
            },
    container_element: null,
    winning_sequences: [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                    ],

    // FUNCTIONS
    init: function(container) {
        this.container_element = container;
    },

    make_play: function(position) {
        if (this.gameover) return false;
        if (this.board[position] === ''){
            this.board[position] = this.simbols.options[this.simbols.turn_index];
            this.draw();
            // contador de partidas
            let winning_sequences_index = this.check_winning_sequences( this.simbols.options[this.simbols.turn_index] );
            if (winning_sequences_index >= 0){
                // chama para pintar os blocos da vitoria
                this.stylize_winner_sequence(this.winning_sequences[winning_sequences_index]);
                // chama para exibir o campeao
                this.mostra_jogador_win(this.simbols.options[this.simbols.turn_index]);
            } else{
                this.simbols.change();
            }
            return true;
        }
        else {
            return false;
        }
        
    },

    // modifiquei aqui 
    // pinta os blocos da sequencia ganhadora
    stylize_winner_sequence: function(winner_sequence) {
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
      },

      // modifiquei aqui EXPLICAR no VIDEO
    // mostra o jogador campeao da rodada guarda utilizando LocalStorage
    mostra_jogador_win: function(simbols){
        //let x = this.simbols.turn_index;
        if (simbols == "X") {
            console.log("Jogador X");
            this.jogadorXvitorias = this.jogadorXvitorias + 1;
            localStorage.setItem("VitoriasX", this.jogadorXvitorias);
            localStorage.setItem("campeao", "jogador X");
            this.campeao = "jogador X";
        }
        else if(simbols == "O"){
            console.log("Jogador O");
            this.jogadorOvitorias = this.jogadorOvitorias + 1;
            localStorage.setItem("VitoriasO", this.jogadorOvitorias);
            localStorage.setItem("campeao", "jogador O");
            this.campeao = "jogador O";
        }
            alert("Placar: \nJogador O: "+ localStorage.getItem("VitoriasO") + 
                          "\nJogador X: " + localStorage.getItem("VitoriasX"));
            this.partidas = this.partidas + 1;
            localStorage.setItem('partidas', this.partidas);
            
            var elemento_pai = document.body;
            var titulo = document.createElement('p');
            var texto = document.createTextNode("Partida "+ localStorage.getItem('partidas') + " campeao " + localStorage.getItem('campeao'));
            titulo.appendChild(texto);
            elemento_pai.appendChild(titulo);
    },

    check_winning_sequences: function(simbol) {

        for ( i in this.winning_sequences ) {
            if (this.board[ this.winning_sequences[i][0] ] == simbol  &&
                this.board[ this.winning_sequences[i][1] ] == simbol &&
                this.board[ this.winning_sequences[i][2] ] == simbol) {
                console.log('winning sequences INDEX:' + i);
                return i;
            }
        };
        return -1;
    },

    start: function() {
        this.board.fill('');
        this.draw();      
    },

    draw: function() {
        let content = '';

        for ( i in this.board ) {
            content += '<div onclick="tic_tac_toe.make_play(' + i + ')">' + this.board[i] + '</div>';
        };

        this.container_element.innerHTML = content;   
    },
    

};