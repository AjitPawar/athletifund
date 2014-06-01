var SPORTLIST = ["Archery", "Badminton", "Baseball", "Basketball", "Dance", "Dodgeball", "Floor hockey",
					"Football", "Frisbee", "Gymnastics", "Judo", "Karate", "Lacrosse", "Rugby", "Soccer",
					"Table tennis", "Taekwondo", "Tennis", "Volleyball", "Wrestling"];
var PEOPLE = [];
var TEAMS = [];
var ZIPCODES = new Array();


function Zipcode(lat, lon){
	this.lat = lat;
	this.lon = lon;
}


function Person(name, age, gender, zipcode, income, sportsInterests, photo,
	description, isManager, email, phone, requests, need) {
	this.name = name;
	this.age = age;
	this.gender = gender; //M, F, N
	this.zipcode = zipcode; //private
	this.income = income; //private
	this.sportsInterests = sportsInterests; //list of keywords from SPORTLIST
	this.photo = photo;
	this.description = description;
	this.isManager = isManager;
	this.teams = []; //list of Team objects
	this.email = email; //private
	this.phone = phone; //private
	this.requests = requests; //list of Request objects
	this.amount = 0;
	this.amountNeed = 0;
	this.need = need
	}

	
function Request(requester, amount, endDate, isFunded, mailingList, donorList) {
	this.requester = requester;
	this.amount = amount;
	this.sofar = 0;
	this.endDate = endDate;
	this.isFunded = isFunded;
	this.mailingList = mailingList; //list of donor emails
	this.donorList = donorList; //list of donor names
	}

function Team(teamName, ageRange, gender, maxEnrollment, teamManager, minEntryFee, homeRec, 
	description, photo, mailingList, contactEmail, sports, members) {
	this.teamName  = teamName;
	this.ageRange = ageRange; // tuple of youngest and oldest age, inclusive
	this.gender = gender; //M, F, N
	this.maxEnrollment = maxEnrollment;
	this.teamManager = teamManager; // Person object whose isManager is True
	this.minEntryFee = minEntryFee;
	this.homeRec = homeRec;
	this.description = description;
	this.photo = photo;
	this.mailingList = mailingList; //list of donor emails
	this.contactEmail = contactEmail; //email of teamManager
	this.sports = sports; //list of keywords from SPORTLIST
	this.members = []; //list of Person objects
	this.requests = [];
	}

function addMember(team, newMember) {
	if (team.members.length == team.maxEnrollment) {
		var message = team.teamName + " team is already at maximum capacity.";
		alert(message);
		}
	else {
		newMember.teams.push(team);
		team.members.push(newMember);
		var message = "You have successfully joined team " + team.teamName;
		alert(message); 
		}
	}
	
function removeMember(team, member) {
	var index = team.members.indexOf(member);
	if (index > -1) {
		team.members.splice(index, 1);
		}
	var index2 = member.teams.indexOf(team);
	if (index2 > -1) {
		member.teams.splice(index2, 1);
		}
	message = "You have been removed from " + team.teamName;
	alert(message);
	}
	
function setManager(team, member) {
	member.isManager = 1;
	team.teamManager = member;
	team.contactEmail = member.email;
	}
	
function fundRequest(request, donationAmount, donorName, donorEmail) {
	request.soFar += donationAmount;
	request.mailingList.push(donorEmail);
	request.donorList.push(donorName);
	if (soFar >= amount) {
		request.isFunded = 1;
		emailDonorsAboutSuccess(request);
		alert("You did it- that was the final push! Your support in bettering your community " +
		"will be appreciated.");
		}
	}

function search(searchText) {
	//searches team names, people names, team sport keywords, people sport keywords 
	var results = [];
	for (var team in TEAMS) {
		if (team.teamName.search(searchText) > -1) {
			results.push(team);
			}
		else {
			for (var keyword in team.sports) {
				if (keyword.search(searchText) > -1) {
					results.push(team);
					}
				}
			}
		}
		
	for (var person in PEOPLE) {
		if (person.name.search(searchText) > -1) {
			results.push(person);
			}
		else {
			for (var keyword in person.sportsInterests) {
				if (keyword.search(searchText) > -1) {
					results.push(person);
					}
				}
			}
		}
		
	return results;
	}



// **** TEST DATA ****

// Populate zipcodes
var zip1 = new Zipcode(43.702762, -79.293289);
var zip2 = new Zipcode(43.788995, -79.301857);
var zip3 = new Zipcode(43.764560, -79.245409);
ZIPCODES["M4B2K1"] = zip1;
ZIPCODES["M1T2M5"] = zip2;
ZIPCODES["M4B1B3"] = zip3;



var ls_teams = [];
var ls_teams2 = [];
var ls_teams3 = [];
var ls_requests = [];
var sports_ls = ["Dance","Gymnastics"];
var sports2_ls = ["Rugby"];
var sports3_ls = ["Basketball", "Rugby"];
var sports4_ls = ["Rugby"];
var sports5_ls = ["Basketball"];
var mailing_ls = ["generous@bye.com"];
var mailing2_ls = ["cashmoney@bye.com"];

var person1 = new Person("Rufus Garcia", 10, "M", "M4B2K1", 3.50, sports3_ls, "img/D.jpg", "I'm some guy", 
	0, ls_teams, "hi@bye.com", "4152232211", ls_requests, 0, 120);

var person2 = new Person("Bernadette Warren", 12, "F", "M1T2M5", 1000, sports3_ls, "img/D.jpg", "I'm some girl also", 
	1, ls_teams, "hello@bye.com", "1231231233",	ls_requests, 0, 60);

var person3 = new Person("Wilbert Thomas", 15, "M", "M4B2K1", 3.50, sports5_ls, "img/D.jpg", "nice guy", 
	0, ls_teams2, "C@bye.com", "4152232211", ls_requests, 0, 80);

var person4 = new Person("Celia May", 16, "F", "M4B1B3", 3.50, sports5_ls, "img/D.jpg", "kool gal", 
	1, ls_teams2, "D@bye.com", "1111111111", ls_requests, 0, 90);

var person5 = new Person("Roy Abbott", 16, "M", "M1T2M5", 3.50, sports5_ls, "img/D.jpg", "dude guy", 
	0, ls_teams2, "E@bye.com", "2222222222", ls_requests, 0, 50);


var membership_ls = [person1,person2];
var membership2_ls = [person3,person4, person5];

var team1 = new Team("Warriors", "Rugby", (9,13), "F", 25,
 person2, 25, "University Settlement Recreation Centre", "small people. violent sports.",
  "img/friendship.jpg", mailing_ls,	"hello@bye.com", sports2_ls, membership_ls);


var team2 = new Team("Little League", (15,18), "N", 3, person4,
	5, "Trinity Community Recreation Centre", "sparkley", "teamsportz.jpg", mailing2_ls,
	"img/friendship.jpg", sports_ls, membership2_ls);

var team3 = new Team("Hurricanes", (15,18), "N", 3, person4,
	5, "recplace", "sparkley", "teamsportz.jpg", mailing2_ls,
	"img/friendship.jpg", sports_ls, membership2_ls);

var team4 = new Team("Pistons", (15,18), "N", 3, person4,
	5, "Jimmy Simpson Recreation Centre", "sparkley", "teamsportz.jpg", mailing2_ls,
	"img/friendship.jpg", sports_ls, membership2_ls);

var team5 = new Team("Raptors", (15,18), "N", 3, person4,
	5, "Huron Recreation Centre", "sparkley", "teamsportz.jpg", mailing2_ls,
	"img/friendship.jpg", sports_ls, membership2_ls);


var req1 = new Request(666, "14-06-2014", 0, mailing2_ls, "Kool Guy");
var req2 = new Request(40, "30-08-2014", 0,  mailing_ls, "Mr. Man");


person1.teams.push(team1);
person2.teams.push(team1);
person3.teams.push(team2);
person4.teams.push(team2);
person5.teams.push(team2);


PEOPLE.push(person1);
PEOPLE.push(person2);
PEOPLE.push(person3);
PEOPLE.push(person4);
PEOPLE.push(person5);

TEAMS.push(team1);
TEAMS.push(team2);
TEAMS.push(team3);
TEAMS.push(team4);
TEAMS.push(team5);

