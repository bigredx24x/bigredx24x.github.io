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

var teams = ['1 tbd',
             '16 tbd',
             '8 tbd',
             '9 tbd',
             '5 tbd',
             '12 tbd',
             '4 tbd',
             '13 tbd',
             '6 tbd',
             '11 tbd',
             '3 tbd',
             '14 tbd',
             '7 tbd',
             '10 tbd',
             '2 tbd',
             '15 tbd',
             // ---
             '1 tbd',
             '16 tbd',
             '8 tbd',
             '9 tbd',
             '5 tbd',
             '12 tbd',
             '4 tbd',
             '13 tbd',
             '6 tbd',
             '11 tbd',
             '3 tbd',
             '14 tbd',
             '7 tbd',
             '10 tbd',
             '2 tbd',
             '15 tbd',
             // ---
             '1 tbd',
             '16 tbd',
             '8 tbd',
             '9 tbd',
             '5 tbd',
             '12 tbd',
             '4 tbd',
             '13 tbd',
             '6 tbd',
             '11 tbd',
             '3 tbd',
             '14 tbd',
             '7 tbd',
             '10 tbd',
             '2 tbd',
             '15 tbd',
             // ---
             '1 tbd',
             '16 tbd',
             '8 tbd',
             '9 tbd',
             '5 tbd',
             '12 tbd',
             '4 tbd',
             '13 tbd',
             '6 tbd',
             '11 tbd',
             '3 tbd',
             '14 tbd',
             '7 tbd',
             '10 tbd',
             '2 tbd',
             '15 tbd']
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

    var buttons = new $.fn.dataTable.Buttons(table, {
         buttons: [
           'copyHtml5',
           'excelHtml5',
           'csvHtml5',
           'pdfHtml5'
        ]
    }).container().appendTo($('#buttons'));
} );
