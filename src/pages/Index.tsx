
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Users, GraduationCap, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DonateModal from "@/components/DonateModal";

const Index = () => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const impactMetrics = [
    { number: "6.5 Lakh+", label: "Lives Reached", icon: Heart },
    { number: "126+", label: "Schools Digitized", icon: GraduationCap },
    { number: "2000+", label: "Women Empowered", icon: Users },
    { number: "10+", label: "States Served", icon: MapPin },
  ];

  const projects = [
    {
      title: "Rural Health Initiative",
      summary: "Bringing primary healthcare to remote villages across Karnataka and Tamil Nadu.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      category: "Health"
    },
    {
      title: "Digital Education Program",
      summary: "Modernizing government schools with technology and teacher training.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop",
      category: "Education"
    },
    {
      title: "Women's Livelihood Support",
      summary: "Skill development and micro-enterprise support for rural women.",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=250&fit=crop",
      category: "Livelihood"
    }
  ];

  const quotes = [
    {
      text: "HDWI Foundation changed my life by providing skills training. I now run my own tailoring business and support my family.",
      author: "Lakshmi, Beneficiary",
      location: "Tumkur, Karnataka"
    },
    {
      text: "Their health camps in our village have been a blessing. Regular check-ups and medicines are now accessible to everyone.",
      author: "Dr. Rajesh Kumar",
      location: "Community Health Worker"
    },
    {
      text: "Partnering with HDWI for our CSR initiatives has created meaningful impact in rural communities.",
      author: "Priya Sharma",
      location: "CSR Head, Tech Corp"
    }
  ];

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onDonate={() => setIsDonateModalOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <Badge variant="outline" className="mb-6 text-sm font-medium border-pink-200 text-pink-800">
            Since 1992 • Progressive Social Change
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight">
            Towards Progressive
            <span className="block text-pink-600">Social Change</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Partnering for health, dignity & well-being in underserved communities since 1992.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg">
              View Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-pink-200 text-pink-700 hover:bg-pink-50 px-8 py-4 text-lg"
              onClick={() => setIsDonateModalOpen(true)}
            >
              Donate Now
              <Heart className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                    <metric.icon className="h-8 w-8 text-pink-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{metric.number}</div>
                  <div className="text-gray-600 font-medium">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Carousel */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving measurable change through focused initiatives in health, education, and livelihood.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-8">
                  <Badge variant="secondary" className="mb-4 bg-pink-100 text-pink-800">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.summary}</p>
                  <Button variant="outline" className="w-full border-pink-200 text-pink-700 hover:bg-pink-50">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Slider */}
      <section className="py-24 bg-pink-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Voices of Change</h2>
            <p className="text-xl text-gray-600">Stories from our community</p>
          </div>
          <div className="relative">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <blockquote className="text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
                  "{quotes[currentQuote].text}"
                </blockquote>
                <div className="flex flex-col items-center">
                  <div className="font-bold text-pink-700 mb-1">{quotes[currentQuote].author}</div>
                  <div className="text-gray-600">{quotes[currentQuote].location}</div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center mt-8 gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevQuote}
                className="border-pink-200 text-pink-700 hover:bg-pink-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextQuote}
                className="border-pink-200 text-pink-700 hover:bg-pink-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CSR Campaign Feature */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-6 border-pink-200 text-pink-800">
                Corporate Partnerships
              </Badge>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Strategic CSR for Real Impact</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Partner with us to create meaningful change through targeted health campaigns for women and children. 
                Our transparent reporting and measurable outcomes ensure your CSR investments drive real social impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                  Download CSR Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-pink-200 text-pink-700 hover:bg-pink-50">
                  Partner With Us
                </Button>
              </div>
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=600&fit=crop" 
                alt="CSR Partnership"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-pink-600 text-white md:hidden z-50">
        <Button 
          className="w-full bg-white text-pink-600 hover:bg-gray-50"
          onClick={() => setIsDonateModalOpen(true)}
        >
          💙 Donate Now
        </Button>
      </div>

      <DonateModal isOpen={isDonateModalOpen} onClose={() => setIsDonateModalOpen(false)} />
    </div>
  );
};

export default Index;
