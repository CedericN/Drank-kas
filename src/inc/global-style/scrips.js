var toggler = document.getElementsByClassName("tree");
var i;
var aantalVakkenEersteJaar = 12;
var aantalVakkenDerdeJaar = 7;
var myIndexImages = 0;
var index_img_show = 0;

for (i = 0; i < toggler.length; i++) {
	toggler[i].addEventListener("click", function() {
		this.parentElement.querySelector(".tree_nested").classList.toggle("tree_active");
		this.classList.toggle("tree-down");
	});
}

function resset()
{
	var checkBox = document.querySelectorAll("input[class=checkBox]");
	var groepen = document.querySelectorAll("input[class=groepen]");
	
	for(var i = 0; i<checkBox.length; i++)
	{
		checkBox[i].checked = false;
	}
	
	for(var i = 0; i<groepen.length; i++)
	{
		<!-- console.log(i); -->
		groepen[i].checked = false;
	}
	agenda_update();
	for (i = 0; i < toggler.length; i++) {
		if (toggler[i].classList.contains("tree-down"))
		{
			toggler[i].parentElement.querySelector(".tree_nested").classList.toggle("tree_active");
			toggler[i].classList.toggle("tree-down");
		}
	};
}


function groepen()
{
	var checkBox = document.querySelectorAll("input[class=checkBox]");
	var groepen = document.querySelectorAll("input[class=groepen]");
	var i,j;


	<!-- console.log(checkBox.length); -->
	<!-- console.log(groepen.length); -->

	for(i = 0; i<groepen.length;i++)
	{
		if(groepen[i].checked == true)
		{
			<!-- console.log(i); -->
			if(i<6)
			{
			for(j = i*aantalVakkenEersteJaar;j<(i+1)*aantalVakkenEersteJaar;j++)
			 {
				<!-- console.log(j); -->
				checkBox[j].checked = true;
			 }
			}
			else
			{
			 for(j = (6*aantalVakkenEersteJaar) + ((i-6)*aantalVakkenDerdeJaar);j<(6*aantalVakkenEersteJaar)+((i-5)*aantalVakkenDerdeJaar);j++)
			 {
				<!-- console.log(j); -->
				checkBox[j].checked = true;
			 }

			}

		}
		else
		{
			if(i<6)
			{
			for(j = i*aantalVakkenEersteJaar;j<(i+1)*aantalVakkenEersteJaar;j++)
			 {
				<!-- console.log(j); -->
				checkBox[j].checked = false;
			 }
			}
			else
			{
			 for(j = (6*aantalVakkenEersteJaar) + ((i-6)*aantalVakkenDerdeJaar);j<(6*aantalVakkenEersteJaar)+((i-5)*aantalVakkenDerdeJaar);j++)
			 {
				<!-- console.log(j); -->
				checkBox[j].checked = false;
			 }

			}
			<!-- console.log(i); -->
		}
	}
	agenda_update();
}

function agenda_update()
{
	var link;
	var exit;
	var checkBox = document.querySelectorAll("input[class=checkBox]");
	var groepen = document.querySelectorAll("input[class=groepen]");
	var algemeen = document.querySelectorAll("input[class=algemene_meldingen]");
	var agenda = document.getElementById("iframe_agenda");
	var basisLink = "https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FBrussels&mode=WEEK&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0";
	var algemene_agenda = [
		"&src=cXJycHZnMDZ1OWVjZWdzc2g3aXZocDZjM3NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23795548", /*Algemene mededeling Eerste jaar*/
		"&src=bW0ybXVqbWpqMmU5MDBzbnI4MWg1NXFqanNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23795548", /*Algemene mededeling Tweede jaar*/
		"&src=OGEyM25zcTNkOWoyOWZqaGhwbHFnbGhtcmtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23795548" ]; /*Algemene mededeling Derde jaar*/
	var vakken = [
	"&src=YjFyNXBsNnB0dHR1czhvMGQwZHU1czVjZTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000",/*Groep A: cp1*/
	"&src=aWNhMHNocGQwZ2xxc2ZnbWExb2NvMjJrMWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000",/*cp2*/
	"&src=cTRpdHFpMHV0OTdtbmVkNGFiMmw3bmxxMDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000",/*dt*/
	"&src=dXNuOTlkNDkzMmxpNnI2MWp2aGNvNGZxNzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000",/*elek1*/
	"&src=NmEwZjlidmp1b2hxMjdtdWp2Y3YwanVlN2tAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000",/*elek2*/
	"&src=bWcwb2JrN2IwMW12cDVqbmtiMWRlYTltMXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000",/*mecha*/
	"&src=NW0xbG5kdW9zNGwxNm1zZDYycjdsMTkwYXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000",/*netw*/
	"&src=dmNxbGplNW5udTExdXVvbjlmNG9vaDVyMG9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000",/*pro ontw*/
	"&src=MnBxc3VnYXBzbzg2MzBmbzlsaW82MjZnN2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000",/*pro tech*/
	"&src=aW0zODAzNXVoanY2a2o3c2JrNmZmc2s5YjRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000",/*VHDL*/
	"&src=dmpkYmxuNDFjbGU0aG4xMHJvc2g4dHNhZzBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000",/*wisk*/
	"&src=b3ZqZGp0c2lydmU1cTZwdmM2Y2Rka211cW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D50000",/*webtech*/
	"&src=ZnIwMnZzaGUzOGtkNDZqNzJrMmU4ZWQxaTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4",/*Groep B: cp1*/
	"&src=Z21uNTVscmc1MnMxMGtqNzYzbGt0b2s2djBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4",/*cp2*/
	"&src=b3NjN3MwZmZzbWxsODJocGlsbjFkdGNhZjRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4",/*dt*/
	"&src=dnZwNWc2OXNtZG1scGFtdmc0bGJra3ExZGtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4",/*elek1*/
	"&src=MzgwaHBudTlmdjlqY21ubDhyc2pqaGQ4YmNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4",/*elek2*/
	"&src=NjAxczVlaHJtNnMwZTduaXFuam10ODJuMW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4",/*mecha*/
	"&src=dHZtYTdjdW43YjhiNmU5ZnNtc3UxMGlhMm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4",/*netw*/
	"&src=bmZlMTkwNnBzNXYwZTg5aDJzcGN1MDhqYTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4",/*pro ontw*/
	"&src=bjlvMzh1bzhyZTgya3NoNXFzazd2MGhsOTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23FF0000",/*pro tech*/
	"&src=MjhhZ3ZsNXZqcnNyN21zcmp0ODc2c3IxNG9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4",/*VHDL*/
	"&src=ODJjYzhraGhsZnZldHUxMjZiYmR0a2E2ZTBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4",/*wisk*/
	"&src=bTcxYnV1cGM5ZDBuNnR2dmZsZ21oaXJxbG9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%234285F4",/*webtech*/
	"&src=cXVwcjE1NnJuaXE1cjVqZmJoNW50dGJuMmNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043",/*Groep C: cp1*/
	"&src=cWF0NHI1MHRpNjN2dWZxZGR0bjRjYzg2MWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043",/*cp2*/
	"&src=Yzlvbm9kc3UyZWQ1ZWV0OTFwbmtqcHZ1aGdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043",/*dt*/
	"&src=aG85MnJoa281MTFmNGFkY2ViZTBzZjB1cWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043",/*elek1*/
	"&src=cW50dXVyZWowbmtsYjE1dHFtc2FqZGcycGtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043",/*elek2*/
	"&src=dWNnMGZqOW12MWVza2QwdnBqOGNiczViNjRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043",/*mecha*/
	"&src=a2dxN2lwbGQ1c3IyajZtYWU0Z2VtdDYzbmNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043",/*netw*/
	"&src=YTBxcWhoc2Z0b2lmZTl1a2ZzZG5kMWRzMDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043",/*pro ontw*/
	"&src=bjVqYXQ4OG8xdWNzNnI3NTk0Z2podXA4YzRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043",/*pro tech*/
	"&src=cDZsb240Yzdsa2luamRybWExYThoMGdqb3NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043",/*VHDL*/
	"&src=cjRlaGwwZG0zZHUxZmhvMzNnZW9wZG1iY2tAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043",/*wisk*/
	"&src=cjFhbTA5bHJnMm5tMzFnMGJpczNhbWI4dDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043",/*webtech*/
	"&src=bm0xbzQyZ2dlbzliMnBxZ2FyczY5OWZxYmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26",/*Groep D: cp1*/
	"&src=YnFlZWV1OHRyaHA3YTE4aWhnMHZkcGRuZzRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26",/*cp2*/
	"&src=dG85N2FkbW1kZ2Z2c2tjZ3Q4NjFhY3FvOHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26",/*dt*/
	"&src=ZTNhZ3M5ZmN0cThqOXEwMThycWJ1OTVva2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26",/*elek1*/
	"&src=NGRuNTA0MjhxMXZoYnU3NW1pampmZG5jYThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26",/*elek2*/
	"&src=dmNocmk2ZWxvNHZzOTNnYWlnZHZmczlwdjhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26",/*mecha*/
	"&src=NHA0ZW1jaWQ5aW9ybHVnamhqOGg2bG5ldmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26",/*netw */
	"&src=OGVhYjIyNGJlajMzcDhudHVhMzFlNWx2Ym9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26",/*pro ontw*/
	"&src=MjVyaDM4MWtwZmxvYmY1NjJ2aDhrZHBzNzBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26",/*pro tech*/
	"&src=M3U0ZGttc3E0b2FxanFpM2MxZWFoZ2Y4azBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26",/*VHDL*/
	"&src=dWUzMGV2cW9zZ2lwN3Via3ZwZ2hubTA4NThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26",/*wisk*/
	"&src=OW5vdmhvbHFiaTZyODhsZzk2MDl2Z3JscDBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26", /*webtech Einde Vakken eerste jaar */
	"&src=dnVzaXRxNTIxM25idDlmaG4xcG1nbWdqb3NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E",/*Groep A: BA*/
	"&src=dTFlNWRsYTJkMWE1b2kyMmJucDYwYnE2Ym9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E",/*C++*/
	"&src=cGliYmZoam5uaWhtOGhqbnZ2YTFnZjhiM2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E",/*ES1*/
	"&src=MXRuajFsbzMwa3A0aGdqdmNuNHAxaGpyZW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E",/*ES2*/
	"&src=bDY0amNtZGtwNmlpMmpiazViNWUwZ25qbTBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E",/*FPGA*/
	"&src=bTdxdWdkNzY0Zmpxc2toNmtkY2o0dnN1MThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E",/*IOT*/
	"&src=YThzcGcyazI1c3E4NmcxOWNzcjluOW1xcGtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E",/*MC*/
	"&src=ZjlndXJxc29iM3Jhc2hjZWJubTBwZnR1YThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E",/*MSD*/
	"&src=OTJtb2Jnc3BoaXRyZWpqNjVyYmMzdTVjMXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E",/*NP*/
	"&src=b2MxYzltdDZxdGIwaDNwYmdxZ2xnaXVndG9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E",/*PON*/
	"&src=aHRzcTllbzRqODc3OG1mdGVnNDU1OGQwdXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E",/*POZ*/
	"&src=aWp2cG92dmxlYzdocjhnbWVwZjZocDY3ZDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F4511E",/*SA*/
	"&src=MHU5dGw5amNjZWQzOWgzNDNpZm4ybWhtcDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5",/*Groep B: BA*/
	"&src=ODFiNTdka2NrZmlqbjB2a2pybGQzanJ0OHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5",/*C++*/
	"&src=NW9iZG84cXQxMWdlOHNtaWRmbmM2c2lyaGNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5",/*ES1*/
	"&src=YTZ2ZG8yaGVjNTF2N2Nsb2M2dTRiZXZjcHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5",/*ES2*/
	"&src=bGdqcGFnYjZkODhsMWZlcGFiOWZmMTlqNjRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5",/*FPGA*/
	"&src=aHEyMzhsNzZsbzdmdG1iZW4zMWZpbDE2NDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5",/*IOT*/
	"&src=bG0wdGdsNmNqYjFva2g4aXMyZG1wZWM1cnNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5",/*MC*/
	"&src=cGhvMDdiY285MWc5OHQ1NmlldGQ1YmxqZ2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5",/*MSD*/
	"&src=ZTZwODlvajY0NDZtMzExbXJra29tNnRxYjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5",/*NP*/
	"&src=ZnVlNGlmZ3E4czUzcHZhamIwNm8xZ2xhOHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5",/*PON*/
	"&src=cjRrdXZjOGMzazR0ZjQ0NTV2ZDQ2ZzVoZTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5",/*POZ*/
	"&src=Y2V2Z2o0MmtlZ3E3b2xzMHNzcTRzbWw5bGNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5", /*SA Einde vakken Tweede jaar*/
	"&src=M2NhbzZnODdmcGgwMHZwOTNhNHM5cGs3a3NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23E67C73",/*Groep A: DC*/
	"&src=N3VtcDBzZm0zN3ZxdXMxYmlrb2c0bnBkNWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23E67C73",/*DSP*/
	"&src=N3Blb3ZyNmdrcjNxbTZuZzI1NDkydjkyNHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23E67C73",/*EOS*/
	"&src=cWphcTNrb3VrbmtybDRzcTRwYmN1Z2duMGNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23E67C73",/*EP*/
	"&src=Y3Fjc2sxc2M1NWl2NGV2YmdsNDVpZDB1NDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23E67C73",/*IA*/
	"&src=MzFqZjllbnJoNjg3dmU1dnJrbzdnMHUwdm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23E67C73",/*PI*/
	"&src=dnZ2c2hxZXVnY21lN2RucTBuMjltOHNhdThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23E67C73",/*SS*/
	"&src=bW4yaHBxY2ZhazM4NXBqc25hN2c2bTRsbTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB",/*Groep B: DC*/
	"&src=ajQxajJwOXRxMXJwZjQ1c2ZnNThnbmtqOTBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB",/*DSP*/
	"&src=dGFnb2doNTRsbnZuaHBuNXRwazY2YTRzc3NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB",/*EOS*/
	"&src=MmtuMmFnNnJ0Mjc4aTdzYnVqMTM2NDcxY2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB",/*EP*/
	"&src=Y2pjbzN2dWVzbmxxZG10YzFlY3I2ZXM4NWdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB",/*IA*/
	"&src=Z3E4cTBoMDljYW01bWdiazNrdWdraTRrdDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB",/*PI*/
	"&src=dWtwNDBnaDFjbGZjcDd0cWg2ZnVubnZxN2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB", /*SS Einde vakken Derde jaar*/
	"&src=MjJuZnNycGZuczFpZGZhMGR2NWRqMGVqZ2tAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%238E24AA",/**/
	"&src=cWVrNTBycDI0bDV1cGFjY2FuYnVpdTVoZHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%238E24AA"]; /*Einde vakken Bachelorproef*/

	link = basisLink;

	for(var i = 0; i<groepen.length;i++)
	{
		<!-- console.log(i); -->
		exit = false;
		<!-- console.log(exit); -->
		if(i<6)
		{
			for(var j = i*aantalVakkenEersteJaar;j<(i+1)*aantalVakkenEersteJaar && exit == false;j++)
			{
				<!-- console.log(j); -->
				<!-- console.log(i); -->
				if(checkBox[j].checked == false)
				{
					exit = true;
				}
				<!-- console.log(exit); -->
			}
			if (exit == true)
			{
				groepen[i].checked = false;
			}
			else
			{
				groepen[i].checked = true;
			}
		}
		else
		{
			for(j = (6*aantalVakkenEersteJaar) + ((i-6)*aantalVakkenDerdeJaar);j<(6*aantalVakkenEersteJaar)+((i-5)*aantalVakkenDerdeJaar) && exit == false;j++)
			{
				<!-- console.log(j); -->
				<!-- console.log(i); -->
				if(checkBox[j].checked == false)
				{
					exit = true;
				}
				<!-- console.log(exit); -->
			}
			if (exit == true)
			{
				groepen[i].checked = false;
			}
			else
			{
				groepen[i].checked = true;
			}
		}
		<!-- console.log(exit); -->

	}

	for(var i = 0; i<algemeen.length;i++)
	{
		if(algemeen[i].checked == true)
		{
			link = link.concat(algemene_agenda[i]);
		}
	}

	for (var i = 0; i<checkBox.length;i++)
	{
		if(checkBox[i].checked == true)
		{
			link = link.concat(vakken[i]);
			<!-- console.log(i); -->
		}
	}
	<!-- console.log(link); -->
	agenda.src = link;
}
function downloadICS()
{
	var checkBox = document.querySelectorAll("input[class=checkBox]");
	var algemeen = document.querySelectorAll("input[class=algemene_meldingen]");
	e.preventDefault();
	//Eerste jaar
	if(algemeen[0].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1.ics');
	}
	//Groep A
	if(checkBox[0].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/a/cp1.ics');
	}
	if(checkBox[1].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/a/cp2.ics');
	}
	if(checkBox[2].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/a/dt.ics');
	}
	if(checkBox[3].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/a/ea1.ics');
	}
	if(checkBox[4].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/a/ea2.ics');
	}
	if(checkBox[5].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/a/mech.ics');
	}
	if(checkBox[6].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/a/net.ics');
	}
	if(checkBox[7].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/a/pow.ics');
	}
	if(checkBox[8].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/a/pt.ics');
	}
	if(checkBox[9].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/a/vhdl.ics');
	}
	if(checkBox[10].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/a/wisk.ics');
	}
	if(checkBox[11].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/a/wt.ics');
	}
	//Groep B
	if(checkBox[12].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/b/cp1.ics');
	}
	if(checkBox[13].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/b/cp2.ics');
	}
	if(checkBox[14].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/b/dt.ics');
	}
	if(checkBox[15].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/b/ea1.ics');
	}
	if(checkBox[16].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/b/ea2.ics');
	}
	if(checkBox[17].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/b/mech.ics');
	}
	if(checkBox[18].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/b/net.ics');
	}
	if(checkBox[19].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/b/pow.ics');
	}
	if(checkBox[20].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/b/pt.ics');
	}
	if(checkBox[21].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/b/vhdl');
	}
	if(checkBox[22].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/b/wisk.ics');
	}
	if(checkBox[23].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/b/wt.ics');
	}
	//Groep C
	if(checkBox[24].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/c/cp1.ics');
	}
	if(checkBox[25].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/c/cp2.ics');
	}
	if(checkBox[26].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/c/dt.ics');
	}
	if(checkBox[27].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/c/ea1.ics');
	}
	if(checkBox[28].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/c/ea2.ics');
	}
	if(checkBox[29].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/c/mech.ics');
	}
	if(checkBox[30].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/c/net.ics');
	}
	if(checkBox[31].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/c/pow.ics');
	}
	if(checkBox[32].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/c/pt.ics');
	}
	if(checkBox[33].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/c/vhdl');
	}
	if(checkBox[34].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/c/wisk.ics');
	}
	if(checkBox[35].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/c/wt.ics');
	}
	//Groep D
	if(checkBox[36].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/d/cp1.ics');
	}
	if(checkBox[37].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/d/cp2.ics');
	}
	if(checkBox[38].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/d/dt.ics');
	}
	if(checkBox[39].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/d/ea1.ics');
	}
	if(checkBox[40].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/d/ea2.ics');
	}
	if(checkBox[41].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/d/mech.ics');
	}
	if(checkBox[42].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/d/net.ics');
	}
	if(checkBox[43].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/d/pow.ics');
	}
	if(checkBox[44].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/d/pt.ics');
	}
	if(checkBox[45].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/d/vhdl');
	}
	if(checkBox[46].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/d/wisk.ics');
	}
	if(checkBox[47].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/1/d/wt.ics');
	}
	//tweede jaar
	if(algemeen[1].checked == true)
		{
			window.open('https://ical.pxl-ea-ict.be/eai/2.ics');
		}
			//Groep A
	if(checkBox[48].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/a/ba.ics');
	}
	if(checkBox[49].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/a/c++.ics');
	}
	if(checkBox[50].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/a/es1.ics');
	}
	if(checkBox[51].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/a/es2.ics');
	}
	if(checkBox[52].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/a/fpga.ics');
	}
	if(checkBox[53].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/a/iot.ics');
	}
	if(checkBox[54].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/a/mc.ics');
	}
	if(checkBox[55].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/a/msd.ics');
	}
	if(checkBox[56].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/a/np.ics');
	}
	if(checkBox[57].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/a/pon.ics');
	}
	if(checkBox[58].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/a/poz.ics');
	}
	if(checkBox[59].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/a/sa.ics');
	}
	//Groep B
	if(checkBox[60].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/b/ba.ics');
	}
	if(checkBox[61].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/b/c++.ics');
	}
	if(checkBox[62].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/b/es1.ics');
	}
	if(checkBox[63].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/b/es2.ics');
	}
	if(checkBox[64].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/b/fpga.ics');
	}
	if(checkBox[65].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/b/iot.ics');
	}
	if(checkBox[66].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/b/mc.ics');
	}
	if(checkBox[67].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/b/msd.ics');
	}
	if(checkBox[68].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/b/np.ics');
	}
	if(checkBox[69].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/b/pon.ics');
	}
	if(checkBox[70].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/b/poz.ics');
	}
	if(checkBox[71].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/2/b/sa.ics');
	}
	//derde jaar
	if(algemeen[2].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3.ics');
	}
	//Groep A
	if(checkBox[72].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/a/dc.ics');
	}
	if(checkBox[73].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/a/dsp.ics');
	}
	if(checkBox[74].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/a/eos.ics');
	}
	if(checkBox[75].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/a/ep.ics');
	}
	if(checkBox[76].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/a/ia.ics');
	}
	if(checkBox[77].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/a/pi.ics');
	}
	if(checkBox[78].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/a/ss.ics');
	}
	//Groep B
	if(checkBox[79].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/b/dc.ics');
	}
	if(checkBox[80].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/b/dsp.ics');
	}
	if(checkBox[81].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/b/eos.ics');
	}
	if(checkBox[82].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/b/ep.ics');
	}
	if(checkBox[83].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/b/ia.ics');
	}
	if(checkBox[84].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/b/pi.ics');
	}
	if(checkBox[85].checked == true)
	{
		window.open('https://ical.pxl-ea-ict.be/eai/3/b/ss.ics');
	}
}

function img_on_click(n){
	// var img = document.getElementById("myImg");
	var img = document.getElementsByClassName("center");
	var modal = document.getElementById("myModal");
	var modalImg = document.getElementById("img01");	
	modal.style.display = "block";
	modalImg.src = img[n].src;
}

function span_on_click() {
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
}

function display_text(n) {
	var lijst = document.getElementsByClassName("lijst");
	var text = document.getElementsByClassName("text");
	var foto= document.getElementsByClassName("foto_reflectie");
	var i;

	for (i = 0; i < lijst.length; i++){
		text[i].style.display = "none";
		foto[i].style.display = "none";
	}
	text[n].style.display = "block";
	foto[n].style.display = "block";
	
}

function plusDivs(n) {
	showDivs(myIndexImages += n);
}

function currentDiv(n) {
	showDivs(myIndexImages = n);
}

function carousel(n) {
		myIndexImages++;
		showDivs(myIndexImages);
		setTimeout(carousel, 5000);
}

function showDivs(n) {
	var i;
	var x = document.getElementsByClassName("picture_carousel");
	var dots = document.getElementsByClassName("demo");
	if (n > x.length) {myIndexImages = 1}    
	if (n < 1) {myIndexImages = x.length}
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";  
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" w3-blue", "");
	}
	x[myIndexImages-1].style.display = "block";  
	dots[myIndexImages-1].className += " w3-blue";
}

