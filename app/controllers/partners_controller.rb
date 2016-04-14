class PartnersController < ApplicationController
  def index
    @partners = [
      {name:'wri', image:'partners/wri.png', url:'partners/wri', description: "The World Resources Institute (WRI) is a global research organization that spans more than 50 countries. We convene over 450 experts to work closely with leaders to turn big ideas into actions that sustain our natural resources—the foundation of economic opportunity and human well-being."},
      {name:'paco', image:'partners/wri.png', url:'partners/wri', description: "The paco partner"}
    ]
  end
end
