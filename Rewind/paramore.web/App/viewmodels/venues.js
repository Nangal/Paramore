﻿define(['durandal/system', 'durandal/app', 'services/dataService'], function(system, app, dataService) {
    var venueList= ko.observableArray([]);
    var initialized = false;
   //The viewmodel
   var venues = {
        venueList: venueList,
        addVenue: addVenue,
        loadVenues: load,
        activate: activate
    };

   return venues;
    
    //for creating venues
    function Venue() {
        this.name = ko.observable();
        this.streetNumber = ko.observable();
        this.street = ko.observable();
        this.city = ko.observable();
        this.postcode = ko.observable();
        this.contactName = ko.observable();
        this.emailAddress = ko.observable();
        this.phoneNumber = ko.observable();
        this.map = ko.observable();
        this.self = ko.observable();
        this.version = ko.observable();

    };

    function addVenue() {
        venues.push(new Venue());
    };
    
    function load() {
        var rows = dataService.venues.getVenues();
        rows.sort(sortVenues);
        $.each(rows, function(i, v) {
            venueList.push(new Venue()
                .name(v.name)
                .streetNumber(v.address.streetNumber)
                .street(v.address.street)
                .city(v.address.city)
                .postcode(v.address.postCode)
                .contactName(v.contact.name)
                .emailAddress(v.contact.emailAddress)
                .phoneNumber(v.contact.phoneNumber)
                .map(v.links[1].HRef)
                .self(v.links[0].HRef)
                .version(v.version)
            );
        });
    };
    
    function sortVenues(right, left) {
        return (right.name > left.name) ? 1 : -1;
    };
    
    function activate () {
        //the router's activator calls this function and waits for it to complete before proceding
        //Note: Data bind the values between the source and the targets using Knockout
        system.log('activating the venues viewmodel');
        if (initialized) {
            return;
        }

        load();
        initialized = true;
    };

 
});