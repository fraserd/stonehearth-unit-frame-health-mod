 $(document).ready(function() {
     $(top).on("radiant_selection_changed.unit_frame", function unitHealthFrameOnSelectChangedHandler(_, data) {
         if (!App.gameView) {
             return;
         }

         var unitHealthFrame = App.gameView.getView(App.StonehearthUnitFrameHealthView);
         if (!unitHealthFrame) {
             var view = App.gameView.addView(App.StonehearthUnitFrameHealthView, { uri: data.selected_entity });
         } else {
             unitHealthFrame.set('uri', data.selected_entity);
         }
     });
 });

 App.StonehearthUnitFrameHealthView = App.View.extend({
     templateName: 'unitFrameHealth',
     uriProperty: 'model',
     components: {
         'stonehearth:expendable_resources' : {},
         'stonehearth:buffs' : {}
     },

     healthIcons: {
         hearts: {
            "health:f08": "/stonehearth/data/horde/materials/thoughts/health/hearts/heart_0_8.png",
            "health:f18": "/stonehearth/data/horde/materials/thoughts/health/hearts/heart_1_8.png",
            "health:f28": "/stonehearth/data/horde/materials/thoughts/health/hearts/heart_2_8.png",
            "health:f38": "/stonehearth/data/horde/materials/thoughts/health/hearts/heart_3_8.png",
            "health:f48": "/stonehearth/data/horde/materials/thoughts/health/hearts/heart_4_8.png",
            "health:f58": "/stonehearth/data/horde/materials/thoughts/health/hearts/heart_5_8.png",
            "health:f68": "/stonehearth/data/horde/materials/thoughts/health/hearts/heart_6_8.png",
            "health:f78": "/stonehearth/data/horde/materials/thoughts/health/hearts/heart_7_8.png",
            "health:f88": "/stonehearth/data/horde/materials/thoughts/health/hearts/heart_full.png",
            "health:full": "/stonehearth/data/horde/materials/thoughts/health/hearts/heart_full.png",
            "health:zero": "/stonehearth/data/horde/materials/thoughts/health/heart_empty.png"
         },
         blue: {
            "health:f08": "/stonehearth/data/horde/materials/thoughts/health/hearts_blue/heart_0_8.png",
            "health:f18": "/stonehearth/data/horde/materials/thoughts/health/hearts_blue/heart_1_8.png",
            "health:f28": "/stonehearth/data/horde/materials/thoughts/health/hearts_blue/heart_2_8.png",
            "health:f38": "/stonehearth/data/horde/materials/thoughts/health/hearts_blue/heart_3_8.png",
            "health:f48": "/stonehearth/data/horde/materials/thoughts/health/hearts_blue/heart_4_8.png",
            "health:f58": "/stonehearth/data/horde/materials/thoughts/health/hearts_blue/heart_5_8.png",
            "health:f68": "/stonehearth/data/horde/materials/thoughts/health/hearts_blue/heart_6_8.png",
            "health:f78": "/stonehearth/data/horde/materials/thoughts/health/hearts_blue/heart_7_8.png",
            "health:f88": "/stonehearth/data/horde/materials/thoughts/health/hearts_blue/heart_full.png",
            "health:full": "/stonehearth/data/horde/materials/thoughts/health/hearts_blue/heart_full.png",
            "health:zero": "/stonehearth/data/horde/materials/thoughts/health/hearts_blue/heart_0_8.png"
         },
         empty: {
            "health:f08": "/stonehearth/data/horde/materials/thoughts/health/hearts_empty/heart_0_8.png",
            "health:f18": "/stonehearth/data/horde/materials/thoughts/health/hearts_empty/heart_1_8.png",
            "health:f28": "/stonehearth/data/horde/materials/thoughts/health/hearts_empty/heart_2_8.png",
            "health:f38": "/stonehearth/data/horde/materials/thoughts/health/hearts_empty/heart_3_8.png",
            "health:f48": "/stonehearth/data/horde/materials/thoughts/health/hearts_empty/heart_4_8.png",
            "health:f58": "/stonehearth/data/horde/materials/thoughts/health/hearts_empty/heart_5_8.png",
            "health:f68": "/stonehearth/data/horde/materials/thoughts/health/hearts_empty/heart_6_8.png",
            "health:f78": "/stonehearth/data/horde/materials/thoughts/health/hearts_empty/heart_7_8.png",
            "health:f88": "/stonehearth/data/horde/materials/thoughts/health/hearts_empty/heart_full.png",
            "health:full": "/stonehearth/data/horde/materials/thoughts/health/hearts_empty/heart_full.png",
            "health:zero": "/stonehearth/data/horde/materials/thoughts/health/hearts_empty/heart_0_8.png"
         },
     },

     _updateHealth: function() {
         var self = this;
         var healthIconUrl = '';

         // collect required information
         var buffs = self.get('model.stonehearth:buffs')
         var healthPercent = self.get('model.stonehearth:expendable_resources.resource_percentages.health');
         var gutsPercent = self.get('model.stonehearth:expendable_resources.resource_percentages.guts');
         
         var isIncapacitated = buffs && buffs.buffs['stonehearth:buffs:incapacitated'] != undefined
         var isRecuperating = buffs && buffs.buffs['stonehearth:buffs:recuperating'] != undefined
        
         // choose which style of hearts to use, depending on hearthling buffs
         var healthIconType = "hearts";
         if(isIncapacitated) {
             healthIconType = "empty";
             healthPercent = gutsPercent;
         }
         if(isRecuperating) {
             healthIconType = "blue";
             healthPercent = gutsPercent;
         }

         // choose the fractional heart image depending on either health percentage or guts percentage
         if(healthPercent != undefined) {
            healthPercent = healthPercent * 100;
            if(healthPercent === 100)
                    healthIconUrl = self.healthIcons[healthIconType]["health:full"];
            else if(healthPercent < 100)
                    healthIconUrl = self.healthIcons[healthIconType]["health:f78"];
            else if(healthPercent < 87.5)
                    healthIconUrl = self.healthIcons[healthIconType]["health:f68"];
            else if(healthPercent < 75)
                    healthIconUrl = self.healthIcons[healthIconType]["health:f58"];
            else if(healthPercent < 62.5)
                    healthIconUrl = self.healthIcons[healthIconType]["health:f48"];
            else if(healthPercent < 50)
                    healthIconUrl = self.healthIcons[healthIconType]["health:f38"];
            else if(healthPercent < 37.5)
                    healthIconUrl = self.healthIcons[healthIconType]["health:f28"];
            else if(healthPercent < 25)
                    healthIconUrl = self.healthIcons[healthIconType]["health:f18"];
            else if(healthPercent < 12.5)
                    healthIconUrl = self.healthIcons[healthIconType]["health:f08"];
            else if(healthPercent === 0)
                    healthIconUrl = self.healthIcons[healthIconType]["health:zero"];
            else 
                    healthIconUrl = self.healthIcons[healthIconType]["health:full"];

            self._updateVisibility(true);
         } else {
            self._updateVisibility(false);
         }
         var health_key = 'model.unitframehealthmod_health_icon_img';
         if (health_key) {
             self.set(health_key, healthIconUrl);
         }

     }.observes('model.stonehearth:expendable_resources', 'model.stonehearth:buffs'),

     init: function() {
         this._super();
         var self = this;
     },

     _updateVisibility: function(show) {
         var self = this;
         var selectedEntity = self.get('uri');
         if (App.getGameMode() == 'normal' && selectedEntity && show) {
             self.set('isVisible', true);
         } else {
             self.set('isVisible', false);
         }
     },

     supressSelection: function(supress) {},

     didInsertElement: function() {},

     willDestroyElement: function() {},

     commands: function() {},

     actions: {}
 });