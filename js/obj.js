var SPORTLIST = ["Archery", "Badminton", "Baseball", "Basketball", "Dance", "Dodgeball", "Floor hockey",
					"Football", "Frisbee", "Gymnastics", "Judo", "Karate", "Lacrosse", "Rugby", "Soccer",
					"Table tennis", "Taekwondo", "Tennis", "Volleyball", "Wrestling"];
var PEOPLE = [];
var TEAMS = [];

function Person(name, age, gender, address, income, sportsInterests, photo,
	description, isManager, email, phone, requests) {
	this.name = name;
	this.age = age;
	this.gender = gender; //M, F, N
	this.address = address; //private
	this.income = income; //private
	this.sportsInterests = sportsInterests; //list of keywords from SPORTLIST
	this.photo = photo;
	this.description = description;
	this.isManager = isManager;
	this.teams = []; //list of Team objects
	this.email = email; //private
	this.phone = phone; //private
	this.requests = requests; //list of Request objects
	}
	
function Request(amount, endDate, isFunded, mailingList, donorList) {
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
	}

function addMember(team, newMember) {
	if (team.members.length == team.maxEnrollment) {
		var message = team.teamName + "is already at maximum capacity. Try contacting the manager " +
		"to join a waitlist.";
		alert(message);
		}
	else {
		newMember.teams.push(team);
		team.members.push(newMember);
		var message = "You have successfully joined " + team.teamName + ". Now awaiting sponsorship!";
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
		for (var keyword in team.sports) {
			if (keyword.search(searchText) > -1) {
				results.push(team);
				}
			}
		}
		
	for (var person in PEOPLE) {
		if (person.name.search(searchText) > -1) {
			results.push(person);
			}
		for (var keyword in person.sportsInterests) {
			if (keyword.search(searchText) > -1) {
				results.push(person);
				}
			}
		}
	}


var person1 = {name:"A", age:10, gender:"F", income:3.50, sportsInterests:["Basketball", "Rugby"], 
	photo:"/img/D.jpg", description:"I'm some girl", isManager:0, teams=[], email:"hi@bye.com", phone:"4152232211",
	requests:[]};

var person2 = {name:"B", age:12, gender:"F", income:1000, sportsInterests:["Dance", "Rugby"], 
	photo:"/img/D.jpg", description:"I'm some girl also", isManager:1, teams=[], email:"hello@bye.com", phone:"1231231233",
	requests:[]};

var team1 = {teamName:"Preteen Girls' Rugby", ageRange:(9,13), gender:"F", maxEnrollment:25,
 teamManager:person2, minEntryFee:25, homeRec:"recreationcentre1", description:"small people. violent sports.",
  photo:"/img/friendship.jpg", mailingList:["generous@bye.com"],	contactEmail:"hello@bye.com", sports:"Rugby", members:[person1,person2]};

person1.teams.push(team1);
person2.teams.push(team1);

var person3 = {name:"C", age:15, gender:"M", income:3.50, sportsInterests:["Basketball"], 
	photo:"/img/D.jpg", description:"nice guy", isManager:0, teams:[], email:"C@bye.com", phone:"4152232211",
	requests:[]};

var person4 = {name:"D", age:16, gender:"F", income:3.50, sportsInterests:["Basketball"], 
	photo:"/img/D.jpg", description:"kool guy", isManager:1, teams:[], email:"D@bye.com", phone:"1111111111",
	requests:[]};

var person5 = {name:"E", age:16, gender:"M", income:3.50, sportsInterests:["Basketball"], 
	photo:"/img/D.jpg", description:"dude guy", isManager:0, teams:[], email:"E@bye.com", phone:"2222222222",
	requests:[]};

var person6 = {name:"F", age:18, gender:"M", income:3.50, sportsInterests:["Basketball"], 
	photo:"/img/D.jpg", description:"hi guy", isManager:0, teams:[], email:"F@bye.com", phone:"3333333333",
	requests:[]};


var team2 = {teamName:"Dancing Queens", ageRange:(15,18), gender:"N", maxEnrollment:3, teamManager:person4,
	minEntryFee:5, homeRec:"recplace", description:"sparkley", photo:"teamsportz.jpg", mailingList:["cashmoney@bye.com"],
	contactEmail:"/img/friendship.jpg", sports:["Dance","Gymnastics"], members:[person3, person4, person5]};
		
person3.teams.push(team2);
person4.teams.push(team2);
person5.teams.push(team2);

var req1 = {666, "14-06-2014", 0, ["cashmoney@bye.com"], "Kool Guy"};
var req2 = {40, "30-08-2014", 0, ["generous@bye.com"], "Mr. Man"};