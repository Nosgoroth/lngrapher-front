<h3>Oh hi</h3>

<p>Just so you know, this might or might not become a complete thing in the future because my health isn't the best. Even if it does, it's going to be limited in functionality.</p>

<ul>
    <li>It'll get series from the BookWalker CSV export only</li>
    <li>It'll display a graph of when the volumes of a series were released over time, and make some simple projections</li>
    <li><em>Maybe</em> it'll know series relations, like translations and spinoffs, but that's going to have to be crowdsourced</li>
    <li><em>Maybe</em> it'll show volume covers</li>
    <li>It probably <strong>won't</strong> have user accounts</li>
    <li>It probably <strong>won't</strong> link to storefronts other than BookWalker</li>
</ul>

<h3>What needs to be done</h3>

<ul>
    <li><del>Create a basic front website</del></li>
    <li>Create an actual database</li>
    <li>Create an importer to populate that database from the BookWalker CSV, and cron it</li>
    <li>Create an internal API so that the front can access the data</li>
    <li>Slap the graph generating code into the series page</li>
    <li>(MAYBE) Scrape the volume page to get the cover URL and BookWalker series id, or find a better way</li>
    <li>(MAYBE) Create interface so that users can add relations between series. Some people are the worst, so leaving it like this is a bad idea, I know.</li>
    <li>(MAYBE) Create interface so that admins can approve relations between series (would require making user accounts)</li>
</ul>

Contact me on Twitter @nosgoroth