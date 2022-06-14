function getRandomAttackValue(min , max){
    // Math.floor(Math.random() * (max - min)) + min  --> Formula
    return Math.floor(Math.random() * (max - min)) + min;
}



const app = Vue.createApp({
    data: function(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
        }
    },
    computed:{
        monsterBarStyles: function(){
            if(this.monsterHealth < 0){
                return {width: '0%'};
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles: function(){
            if(this.playerHealth < 0){
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'}
        },
        disableSpecialAttack: function(){
            return this.currentRound % 3 === 0 ? false : true;
        }
    },
    watch: {
        playerHealth: function(value){
            if(value <= 0 && this.monsterHealth <= 0){
                // a draw
                this.winner = 'draw';
            }
            else if(value <= 0){
                // player lost
                this.winner = 'monster';
            }
        },
        monsterHealth: function(value){
            if(value <= 0 && this.playerHealth <= 0){
                // a draw
                this.winner = 'draw';
            }
            else if(value <= 0){
                // monster lost
                this.winner = 'player';
            }
        }
    },
    methods: {
        attackMonster: function(){
            this.currentRound++;
            const attackValue = getRandomAttackValue(5, 12)
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer: function(){
            const attackValue = getRandomAttackValue(8, 15 );
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster: function(){
            this.currentRound++;
            const attackValue = getRandomAttackValue(15, 20);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        healPlayer: function(){
            this.currentRound++;
            const healValue = getRandomAttackValue(8, 20);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }
            else{
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        startGame: function(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessages = [];
        },
        surrender: function(){
            this.winner = 'monster';
        },
        addLogMessage: function(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    }
});

app.mount('#game');