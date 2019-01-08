# IIIF Workshop @ UCLA

Slides: https://docs.google.com/presentation/d/1llgoeecPdZQYJ7tANiyVqxvTmQ3XEaZt5-QV5BoY_Y0

**NOTE**: The `iiif` folder that appears in the GUI exists in the CLI at `~/workspace`.

**NOTE**: Many of the URLs in this document are broken, and require replacing `kirschbombe` with the appropriate username for your user. If you see a page that says:

`No workspace is bound to this domain.`

then you may have forgotten to do this replacement.

To do this replacement automatically for all such URLs, run the following command in a terminal, **using your username instead of `kirschbombe`**:

```bash
sed -i -e 's/kirschbombe/kirschbombe/' ~/workspace/README.md 
```

test


## I. Getting Started

In order to get started using this workspace:

1. Start the Cantaloupe IIIF image server
2. Start the static HTTP server (which will host your IIIF manifests as well as demo websites of various IIIF software)


### Starting the servers

Choose one of the following methods:


#### Method 1: run configurations

From the top menu:

1. Click `Run` > `Run Configurations` > `Cantaloupe`
2. Click `Run` > `Run Configurations` > `static HTTP server`

With this method, logging output from the servers may be invisible. Sometimes it is and sometimes it isn't, we're not sure why.


#### Method 2: shell scripts

Use this method if you run into issues with Method 1.

1. Open two terminals in the bottom pane of the IDE
2. In one window, run

    ```bash
    cd ~/workspace
    ./start_cantaloupe.sh
    ```

3. In the other, run

    ```bash
    cd ~/workspace
    ./start_static_http_server.sh
    ```

To verify that the servers are running:

1. Visit the Cantaloupe admin interface at http://iiif-kirschbombe.c9users.io/admin. You should be greeted by a login prompt upon first visit (the instructors will provide credentials).
2. Visit the static HTTP server welcome page at http://iiif-kirschbombe.c9users.io:8082. You should see **IIIF Workshop @ UCLA**.


### Stopping the servers

If you need to stop either of the servers:

1. Select the window in the bottom panel where the server you want to stop is running
2. Press the "Stop" button (run configurations), or press `Ctrl-C` (shell scripts)


## II. Experiments

Here you'll find information for using this IDE to experiment with:

- a IIIF image server (Cantaloupe)
- IIIF Image API clients (OpenSeadragon and Leaflet-IIIF)
- manifests
- IIIF Presentation API clients (Mirador and Universal Viewer)
- tools for automating manifest generation (biiif and osullivan)


### 1. Cantaloupe

[Cantaloupe](https://medusa-project.github.io/cantaloupe/) is one of many IIIF-compatible image servers.


#### Adding images

Put images in `cantaloupe_images` to make them available via Cantaloupe.


#### Requesting images and image information

The base URL of the server is http://iiif-kirschbombe.c9users.io/iiif/2/ (visit that URL for more info).

Example requests:

- http://iiif-kirschbombe.c9users.io/iiif/2/kabuki%2Fucla_bib1987273_no001_rs_001.jpg (image information)
- http://iiif-kirschbombe.c9users.io/iiif/2/kabuki%2Fucla_bib1987273_no001_rs_001.jpg/full/full/0/default.jpg (full default image)
- http://iiif-kirschbombe.c9users.io/iiif/2/kabuki%2Fucla_bib1987273_no001_rs_001.jpg/pct:12,16,54,7/full/3/bitonal.jpg (transformed partial image)


### 2. OpenSeadragon (OSD) and Leaflet-IIIF

[OpenSeadragon](http://openseadragon.github.io/) and [Leaflet-IIIF](https://github.com/mejackreed/Leaflet-IIIF) are two examples of Image API clients.

You can access instances of them running on your static HTTP server:

- http://iiif-kirschbombe.c9users.io:8082/openseadragon
- http://iiif-kirschbombe.c9users.io:8082/leaflet

To choose new images to display in them, edit `openseadragon.html` and `leaflet.js`.


### 3. Manifests

Put manifests in `iiif_manifests` to make them available via the static HTTP server.

To see a list of all your manifests, visit: http://iiif-kirschbombe.c9users.io:8082/manifests

**HINT**: When viewing manifests, it helps if your browser has a nice JSON viewer. Firefox works great out of the box, and several other browsers have add-ons for this purpose.


### 4. Mirador and Universal Viewer (UV)

[Mirador](http://projectmirador.org/) and [Universal Viewer](https://universalviewer.io/) are two examples of Presentation API clients.

You can access instances of them running on your static HTTP server:

- http://iiif-kirschbombe.c9users.io:8082/mirador
- http://iiif-kirschbombe.c9users.io:8082/universalviewer

To choose new manifests to display in them, edit `mirador.html` and `universalviewer.html`.


### 5. biiif and osullivan

[biiif](https://github.com/edsilv/biiif) is a JavaScript utility for automating the generation of IIIF manifests by building filesystem hierarchies according to some conventions.

[osullivan](https://github.com/iiif-prezi/osullivan) is a Ruby implementation of the Presentation API. There are similar libraries for Java and Python.

See `biiif.js` and `osullivan.rb`.


#### Optional: try biiif

To run the biiif demo, run

```bash
cd ~/workspace
./biiif.sh
```

This will create a manifest at `iiif-manifests/biiif_test_github_avatars.json`.

Due to either the limitations of biiif or our understanding of its usage, you'll need to edit the resulting manifest file to correct some of the resource identifiers:

```bash
sed -i \
    -e 's/index\.json/biiif_test_github_avatars\.json/' \
    -e 's/_canvas-\([[:digit:]]\+\)\//_canvas-\1%2F/' \
~/workspace/iiif_manifests/biiif_test_github_avatars.json
```

**NOTE**: biiif only generates manifests according to Presentation API 3.0, so you may currently only view the manifests it creates with UV


#### Optional: try osullivan

To run the osullivan demo, run

```bash
cd ~/workspace
ruby osullivan.rb ~/workspace/cantaloupe_images/kabuki > ~/workspace/iiif_manifests/osullivan_test_kabuki.json
```

This will create a Presentation API 2.x manifest at `iiif-manifests/osullivan_test_kabuki.json`, which you may view with either Mirador or UV.
