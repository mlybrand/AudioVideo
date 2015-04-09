using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AudioVideo.Startup))]
namespace AudioVideo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
