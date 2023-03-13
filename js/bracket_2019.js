var dataSet = JSON.parse(data)
for(i=0; i<dataSet.length; i++){
  dataSet[i]['ngames'] = 0;
  dataSet[i]['projection'] = 0;
}


function pick_winner(elem){
  // id will be <round>_<game><top/bottom>
  var round = parseInt(elem.id.split("_")[0]);
  var game = parseInt(elem.id.split("_")[1]);

  //console.log(round);
  //console.log(game);

  if (round>5){
    return;
  }

  var top_bottom;

  if (game%2 == 1){
    top_bottom = 'bottom'
  } else {
    top_bottom = 'top'
  }

  var id_to_update = (round+1)+'_'+parseInt(game/2)+'_'+top_bottom;

  //console.log(id_to_update);

  var div = document.getElementById(id_to_update);
  div.innerHTML = elem.textContent

  ngames_by_team = get_ngames_for_each_team();
  update_data_stats(ngames_by_team);
  redraw_table()

}

function update_data_stats(ngames_by_team){
  for(i=0; i<dataSet.length; i++){
    var found_team = false;
    for(var team in ngames_by_team){
      if (dataSet[i]['team_name'] === team){
        found_team = true;
        dataSet[i]['ngames'] = ngames_by_team[team]
        dataSet[i]['projection'] = (ngames_by_team[team] * parseFloat(dataSet[i]['PPG'])).toFixed(2)
        break
      }
    }
    if (found_team == false){
      //console.log(dataSet[i]['team_name'])
    }
  }
}

function redraw_table(){
  $('#example').dataTable().fnClearTable();
  $('#example').dataTable().fnAddData(dataSet);
}

var teams = ['1 Duke',
             '16 TBD',
             '8 VCU',
             '9 UCF',
             '5 Mississippi State',
             '12 Liberty',
             '4 Virginia Tech',
             '13 Saint Louis',
             '6 Maryland',
             '11 TBD',
             '3 LSU',
             '14 Yale',
             '7 Louisville',
             '10 Minnesota',
             '2 Michigan State',
             '15 Bradley',
             // ---
             '1 Gonzaga',
             '16 TBD',
             '8 Syracuse',
             '9 Baylor',
             '5 Marquette',
             '12 Murray State',
             '4 Florida State',
             '13 Vermont',
             '6 Buffalo',
             '11 TBD',
             '3 Texas Tech',
             '14 Northern Kentucky',
             '7 Nevada',
             '10 Florida',
             '2 Michigan',
             '15 Montana',
             // ---
             '1 Virginia',
             '16 Gardner-Webb',
             '8 Ole Miss',
             '9 Oklahoma',
             '5 Wisconsin',
             '12 Oregon',
             '4 Kansas State',
             '13 UC Irvine',
             '6 Villanova',
             '11 Saint Mary\'s',
             '3 Purdue',
             '14 Old Dominion',
             '7 Cincinnati',
             '10 Iowa',
             '2 Tennessee',
             '15 Colgate',
             // ---
             '1 North Carolina',
             '16 Iona',
             '8 Utah State',
             '9 Washington',
             '5 Auburn',
             '12 New Mexico State',
             '4 Kansas',
             '13 Northeastern',
             '6 Iowa State',
             '11 Ohio State',
             '3 Houston',
             '14 Georgia State',
             '7 Wofford',
             '10 Seton Hall',
             '2 Kentucky',
             '15 Abilene Christian']
var ngames_by_team = {};

document.addEventListener("DOMContentLoaded", load_tourney());

function load_tourney(){
  var div = document.getElementById('r1left');
  div.innerHTML += get_empty_game_elements(16,1,0);
  var div = document.getElementById('r1right');
  div.innerHTML += get_empty_game_elements(16,1,16);

  var div = document.getElementById('r2left');
  div.innerHTML += get_empty_game_elements(8,2,0);
  var div = document.getElementById('r2right');
  div.innerHTML += get_empty_game_elements(8,2,8);

  var div = document.getElementById('r3left');
  div.innerHTML += get_empty_game_elements(4,3,0);
  var div = document.getElementById('r3right');
  div.innerHTML += get_empty_game_elements(4,3,4);

  var div = document.getElementById('r4left');
  div.innerHTML += get_empty_game_elements(2,4,0);
  var div = document.getElementById('r4right');
  div.innerHTML += get_empty_game_elements(2,4,2);

  fill_round_1();
}

function get_empty_game_elements(ngames, round, offset){
  var returnme = ''
  for(i=0; i<ngames; i++){
    id = round.toString() + '_' + (i+offset).toString()
    idtop = id + '_top'
    idbottom = id + '_bottom'
    returnme += '<ul class="matchup" id="'+id+'"><li class="team team-top" onmousedown="pick_winner(this)" id="'+idtop+'"><span class="score"></span></li><li class="team team-bottom" onmousedown="pick_winner(this)" id="'+idbottom+'"><span class="score"></span></li></ul>';
  }
  return returnme;
}

function fill_round_1(){
    for(i=0; i<32; i++){
      id = '1_'+ i.toString() + '_top';
      var div = document.getElementById(id);
      t = teams[(i*2)%teams.length];
      div.innerHTML += t;

      id = '1_'+ i.toString() + '_bottom'
      var div = document.getElementById(id);
      t = teams[(i*2+1)%teams.length]
      div.innerHTML += t;
    }
}

function get_ngames_for_each_team(){
  ngames_by_team = {};
  for(iround=1; iround<=6; iround++){
    for(igame=0; igame<(32/Math.pow(2,iround-1)); igame++){
      idtop = iround+'_'+igame+'_top';
      topteam = document.getElementById(idtop).textContent.trim();
      idbottom = iround+'_'+igame+'_bottom';
      bottomteam = document.getElementById(idbottom).textContent.trim();
      if(topteam.length>1){
        // strip rank
        topteam = topteam.split(" ").slice(1).join(" ")
        if (topteam in ngames_by_team){
          ngames_by_team[topteam] += 1;
        }
        else {
          ngames_by_team[topteam] = 1;
        }
      }
      if(bottomteam.length>1){
        // strip Rank
        bottomteam = bottomteam.split(" ").slice(1).join(" ");
        if (bottomteam in ngames_by_team){
          ngames_by_team[bottomteam] += 1;
        }
        else {
          ngames_by_team[bottomteam] = 1;
        }
      }


    }
  }
  //console.log(ngames_by_team);
  return ngames_by_team;
}


$(document).ready(function() {
    var table = $('#example').DataTable( {
        data: dataSet,
        columns: [
            { data : 'Player' , title : 'Player'},
            { data : 'team_name', title : 'Team'},
            { data : 'team_rank' , title : 'Rank'},
            { data : 'PPG' , title : 'PPG'},
            { data : 'ngames', title : '# Games'},
            { data : 'projection', title : 'Projection'},
        ]
    } );
    table.order([ 5, "desc" ]).draw()

    var buttons = new $.fn.dataTable.Buttons(table, {
         buttons: [
           'copyHtml5',
           'excelHtml5',
           'csvHtml5',
           'pdfHtml5'
        ]
    }).container().appendTo($('#buttons'));
} );
