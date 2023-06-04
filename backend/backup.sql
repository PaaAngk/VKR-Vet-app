PGDMP                         {            vet    15.1    15.1 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    44417    vet    DATABASE     w   CREATE DATABASE vet WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE vet;
                postgres    false            f           1247    44432    Role    TYPE     P   CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'DOCTOR',
    'MANAGER'
);
    DROP TYPE public."Role";
       public          postgres    false            �            1259    44478    AnalyzesResearch    TABLE     �   CREATE TABLE public."AnalyzesResearch" (
    id integer NOT NULL,
    "typeId" integer NOT NULL,
    "petId" integer NOT NULL,
    data text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 &   DROP TABLE public."AnalyzesResearch";
       public         heap    postgres    false            �            1259    44477    AnalyzesResearch_id_seq    SEQUENCE     �   CREATE SEQUENCE public."AnalyzesResearch_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."AnalyzesResearch_id_seq";
       public          postgres    false    224            �           0    0    AnalyzesResearch_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."AnalyzesResearch_id_seq" OWNED BY public."AnalyzesResearch".id;
          public          postgres    false    223            �            1259    44458    Client    TABLE     �   CREATE TABLE public."Client" (
    id integer NOT NULL,
    "fullName" text NOT NULL,
    "telephoneNumber" text NOT NULL,
    address text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."Client";
       public         heap    postgres    false            �            1259    44457    Client_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Client_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Client_id_seq";
       public          postgres    false    220            �           0    0    Client_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Client_id_seq" OWNED BY public."Client".id;
          public          postgres    false    219            �            1259    44449    Employee    TABLE     {   CREATE TABLE public."Employee" (
    id integer NOT NULL,
    "fullName" text NOT NULL,
    role public."Role" NOT NULL
);
    DROP TABLE public."Employee";
       public         heap    postgres    false    870            �            1259    44448    Employee_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Employee_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Employee_id_seq";
       public          postgres    false    218            �           0    0    Employee_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Employee_id_seq" OWNED BY public."Employee".id;
          public          postgres    false    217            �            1259    44516    Goods    TABLE     �   CREATE TABLE public."Goods" (
    id integer NOT NULL,
    "categoryId" integer NOT NULL,
    name text NOT NULL,
    measure text,
    quantity double precision,
    price double precision
);
    DROP TABLE public."Goods";
       public         heap    postgres    false            �            1259    44525    GoodsCategory    TABLE     c   CREATE TABLE public."GoodsCategory" (
    id integer NOT NULL,
    "categoryName" text NOT NULL
);
 #   DROP TABLE public."GoodsCategory";
       public         heap    postgres    false            �            1259    44524    GoodsCategory_id_seq    SEQUENCE     �   CREATE SEQUENCE public."GoodsCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."GoodsCategory_id_seq";
       public          postgres    false    234            �           0    0    GoodsCategory_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."GoodsCategory_id_seq" OWNED BY public."GoodsCategory".id;
          public          postgres    false    233            �            1259    44533 	   GoodsList    TABLE     �   CREATE TABLE public."GoodsList" (
    "receptionId" integer NOT NULL,
    "goodsId" integer NOT NULL,
    quantity double precision NOT NULL
);
    DROP TABLE public."GoodsList";
       public         heap    postgres    false            �            1259    44515    Goods_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Goods_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Goods_id_seq";
       public          postgres    false    232            �           0    0    Goods_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Goods_id_seq" OWNED BY public."Goods".id;
          public          postgres    false    231            �            1259    44468    Pet    TABLE     �  CREATE TABLE public."Pet" (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    alias text NOT NULL,
    kind text,
    gender boolean,
    breed text,
    "DOB" timestamp(3) without time zone,
    nutrition text,
    color text,
    castration boolean,
    notes text,
    diagnosis text,
    weight double precision,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."Pet";
       public         heap    postgres    false            �            1259    44467 
   Pet_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Pet_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public."Pet_id_seq";
       public          postgres    false    222            �           0    0 
   Pet_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public."Pet_id_seq" OWNED BY public."Pet".id;
          public          postgres    false    221            �            1259    44497 	   Reception    TABLE     {  CREATE TABLE public."Reception" (
    id integer NOT NULL,
    "petId" integer NOT NULL,
    "employeeId" integer NOT NULL,
    "purposeId" integer NOT NULL,
    "clinicalSigns" text,
    anamnesis text,
    diagnosis text,
    assignment text,
    cost double precision,
    discount integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."Reception";
       public         heap    postgres    false            �            1259    44507    ReceptionPurpose    TABLE     e   CREATE TABLE public."ReceptionPurpose" (
    id integer NOT NULL,
    "purposeName" text NOT NULL
);
 &   DROP TABLE public."ReceptionPurpose";
       public         heap    postgres    false            �            1259    44506    ReceptionPurpose_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ReceptionPurpose_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."ReceptionPurpose_id_seq";
       public          postgres    false    230            �           0    0    ReceptionPurpose_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."ReceptionPurpose_id_seq" OWNED BY public."ReceptionPurpose".id;
          public          postgres    false    229            �            1259    44569    ReceptionRecord    TABLE     (  CREATE TABLE public."ReceptionRecord" (
    id integer NOT NULL,
    "employeeId" integer,
    "receptionPurposeId" integer,
    "clientId" integer,
    "dateTimeStart" timestamp(3) without time zone NOT NULL,
    "dateTimeEnd" timestamp(3) without time zone NOT NULL,
    "kindOfAnimal" text
);
 %   DROP TABLE public."ReceptionRecord";
       public         heap    postgres    false            �            1259    44568    ReceptionRecord_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ReceptionRecord_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."ReceptionRecord_id_seq";
       public          postgres    false    244            �           0    0    ReceptionRecord_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."ReceptionRecord_id_seq" OWNED BY public."ReceptionRecord".id;
          public          postgres    false    243            �            1259    44496    Reception_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Reception_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Reception_id_seq";
       public          postgres    false    228            �           0    0    Reception_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Reception_id_seq" OWNED BY public."Reception".id;
          public          postgres    false    227            �            1259    44562    Schedule    TABLE     w   CREATE TABLE public."Schedule" (
    id integer NOT NULL,
    "employeeId" integer NOT NULL,
    date date NOT NULL
);
    DROP TABLE public."Schedule";
       public         heap    postgres    false            �            1259    44561    Schedule_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Schedule_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Schedule_id_seq";
       public          postgres    false    242            �           0    0    Schedule_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Schedule_id_seq" OWNED BY public."Schedule".id;
          public          postgres    false    241            �            1259    44539    Service    TABLE     �   CREATE TABLE public."Service" (
    id integer NOT NULL,
    "typeId" integer NOT NULL,
    name text NOT NULL,
    price double precision
);
    DROP TABLE public."Service";
       public         heap    postgres    false            �            1259    44556    ServiceList    TABLE     �   CREATE TABLE public."ServiceList" (
    "receptionId" integer NOT NULL,
    "serviceId" integer NOT NULL,
    quantity integer NOT NULL
);
 !   DROP TABLE public."ServiceList";
       public         heap    postgres    false            �            1259    44548    ServiceType    TABLE     ]   CREATE TABLE public."ServiceType" (
    id integer NOT NULL,
    "typeName" text NOT NULL
);
 !   DROP TABLE public."ServiceType";
       public         heap    postgres    false            �            1259    44547    ServiceType_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ServiceType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."ServiceType_id_seq";
       public          postgres    false    239            �           0    0    ServiceType_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."ServiceType_id_seq" OWNED BY public."ServiceType".id;
          public          postgres    false    238            �            1259    44538    Service_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Service_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Service_id_seq";
       public          postgres    false    237            �           0    0    Service_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Service_id_seq" OWNED BY public."Service".id;
          public          postgres    false    236            �            1259    44488    TypeAnalyzesResearch    TABLE     f   CREATE TABLE public."TypeAnalyzesResearch" (
    id integer NOT NULL,
    "typeName" text NOT NULL
);
 *   DROP TABLE public."TypeAnalyzesResearch";
       public         heap    postgres    false            �            1259    44487    TypeAnalyzesResearch_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TypeAnalyzesResearch_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."TypeAnalyzesResearch_id_seq";
       public          postgres    false    226            �           0    0    TypeAnalyzesResearch_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."TypeAnalyzesResearch_id_seq" OWNED BY public."TypeAnalyzesResearch".id;
          public          postgres    false    225            �            1259    44440    User    TABLE     �   CREATE TABLE public."User" (
    id integer NOT NULL,
    login text NOT NULL,
    password text NOT NULL,
    role public."Role" NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false    870            �            1259    44439    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    216            �           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          postgres    false    215            �            1259    44420    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            �           2604    44481    AnalyzesResearch id    DEFAULT     ~   ALTER TABLE ONLY public."AnalyzesResearch" ALTER COLUMN id SET DEFAULT nextval('public."AnalyzesResearch_id_seq"'::regclass);
 D   ALTER TABLE public."AnalyzesResearch" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    44461 	   Client id    DEFAULT     j   ALTER TABLE ONLY public."Client" ALTER COLUMN id SET DEFAULT nextval('public."Client_id_seq"'::regclass);
 :   ALTER TABLE public."Client" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    44452    Employee id    DEFAULT     n   ALTER TABLE ONLY public."Employee" ALTER COLUMN id SET DEFAULT nextval('public."Employee_id_seq"'::regclass);
 <   ALTER TABLE public."Employee" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    44519    Goods id    DEFAULT     h   ALTER TABLE ONLY public."Goods" ALTER COLUMN id SET DEFAULT nextval('public."Goods_id_seq"'::regclass);
 9   ALTER TABLE public."Goods" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231    232            �           2604    44528    GoodsCategory id    DEFAULT     x   ALTER TABLE ONLY public."GoodsCategory" ALTER COLUMN id SET DEFAULT nextval('public."GoodsCategory_id_seq"'::regclass);
 A   ALTER TABLE public."GoodsCategory" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    234    234            �           2604    44471    Pet id    DEFAULT     d   ALTER TABLE ONLY public."Pet" ALTER COLUMN id SET DEFAULT nextval('public."Pet_id_seq"'::regclass);
 7   ALTER TABLE public."Pet" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    44500    Reception id    DEFAULT     p   ALTER TABLE ONLY public."Reception" ALTER COLUMN id SET DEFAULT nextval('public."Reception_id_seq"'::regclass);
 =   ALTER TABLE public."Reception" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    228    228            �           2604    44510    ReceptionPurpose id    DEFAULT     ~   ALTER TABLE ONLY public."ReceptionPurpose" ALTER COLUMN id SET DEFAULT nextval('public."ReceptionPurpose_id_seq"'::regclass);
 D   ALTER TABLE public."ReceptionPurpose" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    230    230            �           2604    44572    ReceptionRecord id    DEFAULT     |   ALTER TABLE ONLY public."ReceptionRecord" ALTER COLUMN id SET DEFAULT nextval('public."ReceptionRecord_id_seq"'::regclass);
 C   ALTER TABLE public."ReceptionRecord" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243    244            �           2604    44565    Schedule id    DEFAULT     n   ALTER TABLE ONLY public."Schedule" ALTER COLUMN id SET DEFAULT nextval('public."Schedule_id_seq"'::regclass);
 <   ALTER TABLE public."Schedule" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    241    242            �           2604    44542 
   Service id    DEFAULT     l   ALTER TABLE ONLY public."Service" ALTER COLUMN id SET DEFAULT nextval('public."Service_id_seq"'::regclass);
 ;   ALTER TABLE public."Service" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    236    237            �           2604    44551    ServiceType id    DEFAULT     t   ALTER TABLE ONLY public."ServiceType" ALTER COLUMN id SET DEFAULT nextval('public."ServiceType_id_seq"'::regclass);
 ?   ALTER TABLE public."ServiceType" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    239    239            �           2604    44491    TypeAnalyzesResearch id    DEFAULT     �   ALTER TABLE ONLY public."TypeAnalyzesResearch" ALTER COLUMN id SET DEFAULT nextval('public."TypeAnalyzesResearch_id_seq"'::regclass);
 H   ALTER TABLE public."TypeAnalyzesResearch" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    44443    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    44478    AnalyzesResearch 
   TABLE DATA           V   COPY public."AnalyzesResearch" (id, "typeId", "petId", data, "createdAt") FROM stdin;
    public          postgres    false    224   �       �          0    44458    Client 
   TABLE DATA           [   COPY public."Client" (id, "fullName", "telephoneNumber", address, "createdAt") FROM stdin;
    public          postgres    false    220   ֬       �          0    44449    Employee 
   TABLE DATA           :   COPY public."Employee" (id, "fullName", role) FROM stdin;
    public          postgres    false    218   �       �          0    44516    Goods 
   TABLE DATA           S   COPY public."Goods" (id, "categoryId", name, measure, quantity, price) FROM stdin;
    public          postgres    false    232   ��       �          0    44525    GoodsCategory 
   TABLE DATA           =   COPY public."GoodsCategory" (id, "categoryName") FROM stdin;
    public          postgres    false    234   ��       �          0    44533 	   GoodsList 
   TABLE DATA           I   COPY public."GoodsList" ("receptionId", "goodsId", quantity) FROM stdin;
    public          postgres    false    235   0�       �          0    44468    Pet 
   TABLE DATA           �   COPY public."Pet" (id, "clientId", alias, kind, gender, breed, "DOB", nutrition, color, castration, notes, diagnosis, weight, "createdAt") FROM stdin;
    public          postgres    false    222   ��       �          0    44497 	   Reception 
   TABLE DATA           �   COPY public."Reception" (id, "petId", "employeeId", "purposeId", "clinicalSigns", anamnesis, diagnosis, assignment, cost, discount, "createdAt") FROM stdin;
    public          postgres    false    228   ��       �          0    44507    ReceptionPurpose 
   TABLE DATA           ?   COPY public."ReceptionPurpose" (id, "purposeName") FROM stdin;
    public          postgres    false    230   b�       �          0    44569    ReceptionRecord 
   TABLE DATA           �   COPY public."ReceptionRecord" (id, "employeeId", "receptionPurposeId", "clientId", "dateTimeStart", "dateTimeEnd", "kindOfAnimal") FROM stdin;
    public          postgres    false    244   ��       �          0    44562    Schedule 
   TABLE DATA           <   COPY public."Schedule" (id, "employeeId", date) FROM stdin;
    public          postgres    false    242   |�       �          0    44539    Service 
   TABLE DATA           >   COPY public."Service" (id, "typeId", name, price) FROM stdin;
    public          postgres    false    237   j�       �          0    44556    ServiceList 
   TABLE DATA           M   COPY public."ServiceList" ("receptionId", "serviceId", quantity) FROM stdin;
    public          postgres    false    240   u�       �          0    44548    ServiceType 
   TABLE DATA           7   COPY public."ServiceType" (id, "typeName") FROM stdin;
    public          postgres    false    239   �       �          0    44488    TypeAnalyzesResearch 
   TABLE DATA           @   COPY public."TypeAnalyzesResearch" (id, "typeName") FROM stdin;
    public          postgres    false    226   [�       �          0    44440    User 
   TABLE DATA           ;   COPY public."User" (id, login, password, role) FROM stdin;
    public          postgres    false    216   ��       �          0    44420    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    214   ��       �           0    0    AnalyzesResearch_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."AnalyzesResearch_id_seq"', 13, true);
          public          postgres    false    223            �           0    0    Client_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Client_id_seq"', 15, true);
          public          postgres    false    219            �           0    0    Employee_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Employee_id_seq"', 1, false);
          public          postgres    false    217            �           0    0    GoodsCategory_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."GoodsCategory_id_seq"', 1, false);
          public          postgres    false    233            �           0    0    Goods_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Goods_id_seq"', 55, true);
          public          postgres    false    231            �           0    0 
   Pet_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."Pet_id_seq"', 1, false);
          public          postgres    false    221            �           0    0    ReceptionPurpose_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."ReceptionPurpose_id_seq"', 1, false);
          public          postgres    false    229            �           0    0    ReceptionRecord_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."ReceptionRecord_id_seq"', 12, true);
          public          postgres    false    243            �           0    0    Reception_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Reception_id_seq"', 44, true);
          public          postgres    false    227            �           0    0    Schedule_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Schedule_id_seq"', 742, true);
          public          postgres    false    241            �           0    0    ServiceType_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."ServiceType_id_seq"', 1, false);
          public          postgres    false    238            �           0    0    Service_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Service_id_seq"', 51, true);
          public          postgres    false    236            �           0    0    TypeAnalyzesResearch_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."TypeAnalyzesResearch_id_seq"', 1, false);
          public          postgres    false    225            �           0    0    User_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."User_id_seq"', 3, true);
          public          postgres    false    215            �           2606    44486 &   AnalyzesResearch AnalyzesResearch_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."AnalyzesResearch"
    ADD CONSTRAINT "AnalyzesResearch_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."AnalyzesResearch" DROP CONSTRAINT "AnalyzesResearch_pkey";
       public            postgres    false    224            �           2606    44466    Client Client_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Client"
    ADD CONSTRAINT "Client_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Client" DROP CONSTRAINT "Client_pkey";
       public            postgres    false    220            �           2606    44456    Employee Employee_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Employee" DROP CONSTRAINT "Employee_pkey";
       public            postgres    false    218            �           2606    44532     GoodsCategory GoodsCategory_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."GoodsCategory"
    ADD CONSTRAINT "GoodsCategory_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."GoodsCategory" DROP CONSTRAINT "GoodsCategory_pkey";
       public            postgres    false    234            �           2606    44537    GoodsList GoodsList_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public."GoodsList"
    ADD CONSTRAINT "GoodsList_pkey" PRIMARY KEY ("receptionId", "goodsId");
 F   ALTER TABLE ONLY public."GoodsList" DROP CONSTRAINT "GoodsList_pkey";
       public            postgres    false    235    235            �           2606    44523    Goods Goods_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Goods"
    ADD CONSTRAINT "Goods_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Goods" DROP CONSTRAINT "Goods_pkey";
       public            postgres    false    232            �           2606    44476    Pet Pet_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."Pet"
    ADD CONSTRAINT "Pet_pkey" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."Pet" DROP CONSTRAINT "Pet_pkey";
       public            postgres    false    222            �           2606    44514 &   ReceptionPurpose ReceptionPurpose_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."ReceptionPurpose"
    ADD CONSTRAINT "ReceptionPurpose_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."ReceptionPurpose" DROP CONSTRAINT "ReceptionPurpose_pkey";
       public            postgres    false    230            �           2606    44576 $   ReceptionRecord ReceptionRecord_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."ReceptionRecord"
    ADD CONSTRAINT "ReceptionRecord_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."ReceptionRecord" DROP CONSTRAINT "ReceptionRecord_pkey";
       public            postgres    false    244            �           2606    44505    Reception Reception_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Reception"
    ADD CONSTRAINT "Reception_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Reception" DROP CONSTRAINT "Reception_pkey";
       public            postgres    false    228            �           2606    44567    Schedule Schedule_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Schedule"
    ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Schedule" DROP CONSTRAINT "Schedule_pkey";
       public            postgres    false    242            �           2606    44560    ServiceList ServiceList_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public."ServiceList"
    ADD CONSTRAINT "ServiceList_pkey" PRIMARY KEY ("receptionId", "serviceId");
 J   ALTER TABLE ONLY public."ServiceList" DROP CONSTRAINT "ServiceList_pkey";
       public            postgres    false    240    240            �           2606    44555    ServiceType ServiceType_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."ServiceType"
    ADD CONSTRAINT "ServiceType_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."ServiceType" DROP CONSTRAINT "ServiceType_pkey";
       public            postgres    false    239            �           2606    44546    Service Service_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Service" DROP CONSTRAINT "Service_pkey";
       public            postgres    false    237            �           2606    44495 .   TypeAnalyzesResearch TypeAnalyzesResearch_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public."TypeAnalyzesResearch"
    ADD CONSTRAINT "TypeAnalyzesResearch_pkey" PRIMARY KEY (id);
 \   ALTER TABLE ONLY public."TypeAnalyzesResearch" DROP CONSTRAINT "TypeAnalyzesResearch_pkey";
       public            postgres    false    226            �           2606    44447    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    216            �           2606    44428 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    214            �           1259    44579 #   Client_fullName_telephoneNumber_key    INDEX     z   CREATE UNIQUE INDEX "Client_fullName_telephoneNumber_key" ON public."Client" USING btree ("fullName", "telephoneNumber");
 9   DROP INDEX public."Client_fullName_telephoneNumber_key";
       public            postgres    false    220    220            �           1259    44578    Employee_fullName_key    INDEX     [   CREATE UNIQUE INDEX "Employee_fullName_key" ON public."Employee" USING btree ("fullName");
 +   DROP INDEX public."Employee_fullName_key";
       public            postgres    false    218            �           1259    61040 !   Goods_categoryId_name_measure_key    INDEX     u   CREATE UNIQUE INDEX "Goods_categoryId_name_measure_key" ON public."Goods" USING btree ("categoryId", name, measure);
 7   DROP INDEX public."Goods_categoryId_name_measure_key";
       public            postgres    false    232    232    232            �           1259    44580 "   Pet_alias_kind_gender_clientId_key    INDEX     x   CREATE UNIQUE INDEX "Pet_alias_kind_gender_clientId_key" ON public."Pet" USING btree (alias, kind, gender, "clientId");
 8   DROP INDEX public."Pet_alias_kind_gender_clientId_key";
       public            postgres    false    222    222    222    222            �           1259    56801    Reception_id_key    INDEX     O   CREATE UNIQUE INDEX "Reception_id_key" ON public."Reception" USING btree (id);
 &   DROP INDEX public."Reception_id_key";
       public            postgres    false    228            �           1259    54688    Schedule_date_employeeId_key    INDEX     j   CREATE UNIQUE INDEX "Schedule_date_employeeId_key" ON public."Schedule" USING btree (date, "employeeId");
 2   DROP INDEX public."Schedule_date_employeeId_key";
       public            postgres    false    242    242            �           1259    44582    Service_name_typeId_key    INDEX     `   CREATE UNIQUE INDEX "Service_name_typeId_key" ON public."Service" USING btree (name, "typeId");
 -   DROP INDEX public."Service_name_typeId_key";
       public            postgres    false    237    237            �           1259    44581 !   TypeAnalyzesResearch_typeName_key    INDEX     s   CREATE UNIQUE INDEX "TypeAnalyzesResearch_typeName_key" ON public."TypeAnalyzesResearch" USING btree ("typeName");
 7   DROP INDEX public."TypeAnalyzesResearch_typeName_key";
       public            postgres    false    226            �           1259    44577    User_login_key    INDEX     K   CREATE UNIQUE INDEX "User_login_key" ON public."User" USING btree (login);
 $   DROP INDEX public."User_login_key";
       public            postgres    false    216            �           2606    44593 ,   AnalyzesResearch AnalyzesResearch_petId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."AnalyzesResearch"
    ADD CONSTRAINT "AnalyzesResearch_petId_fkey" FOREIGN KEY ("petId") REFERENCES public."Pet"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public."AnalyzesResearch" DROP CONSTRAINT "AnalyzesResearch_petId_fkey";
       public          postgres    false    3286    224    222            �           2606    44588 -   AnalyzesResearch AnalyzesResearch_typeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."AnalyzesResearch"
    ADD CONSTRAINT "AnalyzesResearch_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public."TypeAnalyzesResearch"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 [   ALTER TABLE ONLY public."AnalyzesResearch" DROP CONSTRAINT "AnalyzesResearch_typeId_fkey";
       public          postgres    false    3290    226    224            �           2606    44623     GoodsList GoodsList_goodsId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."GoodsList"
    ADD CONSTRAINT "GoodsList_goodsId_fkey" FOREIGN KEY ("goodsId") REFERENCES public."Goods"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."GoodsList" DROP CONSTRAINT "GoodsList_goodsId_fkey";
       public          postgres    false    232    3299    235            �           2606    44618 $   GoodsList GoodsList_receptionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."GoodsList"
    ADD CONSTRAINT "GoodsList_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES public."Reception"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."GoodsList" DROP CONSTRAINT "GoodsList_receptionId_fkey";
       public          postgres    false    228    3294    235            �           2606    45593    Goods Goods_categoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Goods"
    ADD CONSTRAINT "Goods_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."GoodsCategory"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Goods" DROP CONSTRAINT "Goods_categoryId_fkey";
       public          postgres    false    234    232    3301            �           2606    44583    Pet Pet_clientId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Pet"
    ADD CONSTRAINT "Pet_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."Client"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public."Pet" DROP CONSTRAINT "Pet_clientId_fkey";
       public          postgres    false    220    3283    222                       2606    45618 -   ReceptionRecord ReceptionRecord_clientId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ReceptionRecord"
    ADD CONSTRAINT "ReceptionRecord_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."Client"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public."ReceptionRecord" DROP CONSTRAINT "ReceptionRecord_clientId_fkey";
       public          postgres    false    3283    244    220                       2606    45608 /   ReceptionRecord ReceptionRecord_employeeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ReceptionRecord"
    ADD CONSTRAINT "ReceptionRecord_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public."ReceptionRecord" DROP CONSTRAINT "ReceptionRecord_employeeId_fkey";
       public          postgres    false    244    3280    218                       2606    45613 7   ReceptionRecord ReceptionRecord_receptionPurposeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ReceptionRecord"
    ADD CONSTRAINT "ReceptionRecord_receptionPurposeId_fkey" FOREIGN KEY ("receptionPurposeId") REFERENCES public."ReceptionPurpose"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 e   ALTER TABLE ONLY public."ReceptionRecord" DROP CONSTRAINT "ReceptionRecord_receptionPurposeId_fkey";
       public          postgres    false    230    244    3296            �           2606    44603 #   Reception Reception_employeeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Reception"
    ADD CONSTRAINT "Reception_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public."Reception" DROP CONSTRAINT "Reception_employeeId_fkey";
       public          postgres    false    228    218    3280            �           2606    44598    Reception Reception_petId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Reception"
    ADD CONSTRAINT "Reception_petId_fkey" FOREIGN KEY ("petId") REFERENCES public."Pet"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public."Reception" DROP CONSTRAINT "Reception_petId_fkey";
       public          postgres    false    228    222    3286            �           2606    44608 "   Reception Reception_purposeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Reception"
    ADD CONSTRAINT "Reception_purposeId_fkey" FOREIGN KEY ("purposeId") REFERENCES public."ReceptionPurpose"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 P   ALTER TABLE ONLY public."Reception" DROP CONSTRAINT "Reception_purposeId_fkey";
       public          postgres    false    230    3296    228                        2606    45603 !   Schedule Schedule_employeeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Schedule"
    ADD CONSTRAINT "Schedule_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public."Schedule" DROP CONSTRAINT "Schedule_employeeId_fkey";
       public          postgres    false    218    3280    242            �           2606    44633 (   ServiceList ServiceList_receptionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ServiceList"
    ADD CONSTRAINT "ServiceList_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES public."Reception"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public."ServiceList" DROP CONSTRAINT "ServiceList_receptionId_fkey";
       public          postgres    false    3294    240    228            �           2606    44638 &   ServiceList ServiceList_serviceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ServiceList"
    ADD CONSTRAINT "ServiceList_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Service"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."ServiceList" DROP CONSTRAINT "ServiceList_serviceId_fkey";
       public          postgres    false    240    237    3306            �           2606    45598    Service Service_typeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public."ServiceType"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Service" DROP CONSTRAINT "Service_typeId_fkey";
       public          postgres    false    237    3308    239            �   �  x��X[��F~n��B���-�JU��[O�l:ĳ�����`�R�b˒��=���d�B�5���B.��C����tq��!�L2٦�}�s��ѹ|uNa|@���ڣ{G�kqk�M��@s�a5�ʓ��Rs5��1�92�� ��a���3�Bz�v�j�=��#:�;���o�N�ڽ�'��T���)1LY+���ԩ�I���w�i.�l�������!�e\�'�n)X���G��G��4[�����������@��?j9J5�0�M�N%�u&��[�p\B\�u��9`�|�墊�_�����rLȘ	N����P�Μx��F0g���5�I��b{̷l)9��EP��y��T�T^QKZL��x�dU�Jm��/rjO���?>�L~��g??�������9"a���m4B�QVe�R5�D�B"���VY�G��=x��sQ�8�"xb)QITVu"A�W�e�_�K�~[��kx�f��6�|sv�PI=�p�#�A���5!�	�7�Ĥ��j��EvU���*����ǆ�4հ������VDWN��)��-���4n�}a����4Ʉ���o�~�=�
�.V�&nsz�I"ϓ�U�����׳\�OVI�+Q��,bO����L+�qV�y�y�,�4\%zϹ�b�]f�6�_�x�k໯a�J����z[��x�<����<H�Ĺ(��/*1�����y�*�����,�����rT�',�.����4uN��m��A�o�#;��l���� �2G���
�ha��pap����g[#fw�3�0�P];�IT&�W'w��;�	6���bF��7�OoK���gi�S�p��:3��:�-�wzֶ*C���Se������	��������8j��iٵ@�c�z�������v�5Oβ�J�2�i,g��Xq4�B�(��?f*�8IjQ�5��(� �>#�OTW�'����m��-O��2Z����1�o11�FJwl�_FY(SPQ���2+�e�1g�L���T$5<�Pل�b? ��a|��� ��ӳ�v9�`-�et.���
��(���_Tu��Z������T�S�]�4���4��ET�-RV-���.��"�/��:���V�M�`.a:���V�WY�G���0���-8��k�%&��K��6y�3��*��ae���e�%"/��~�����g q?��Pxq-�s��|�y���
O,�*��d���,��E]ŲӁ�?���|��l���[��k���~��a����������;�*���#լ���7<j}�b��e��'X���?����_��B�/��m>Q��ρPf��p�	�?�9��FY�P6EM	�V���p7�R[�LUԶ��l#O��Vp��˙�'���֪ܺ�ޑ(:�>x_�}a�)쪠�K�.���Jk���|��W0�������-���#�Z��η����P�R�M�H���	���-ݢ� �㤻;N:��<��`{�1<�9$ dnZ��a�'�S�#��RL��8�	5n�}�����0a���>�>���iY˪��L��ك����55-k���w���ʿ�!�e��=�{�i��U�k���oFZ]��|��Ś�7�X�|�+S�kڧ�f}����x?��]mvs����i֏�W`쪍����f}�n_�^v�mл�-}�
�d��`;:'x����s�=�U�6o�=�֠K�a���	�T��tz:�q��`0��"�S      �   "  x���[n1��ǫ�;d�c��3�V�ŴA�J�Th�@\���'�(mDH�t����gr��x$�x<���5T�Oi�����i�7z�nZ�Ջ�6�s$��*���S>N��:O�IZ���uz������C�u�Z�K<�_�t�������	ى5�pG�c[��([��i�k���Ɛ�����\.��:=�<4��o�w1Zr��N?��>��Y>	Eb�icؖ�:L�bu>i,�u��ǎ���U���s`���"�i�/&Wx���{�������J���b~S�4��Z�\h��-)�H����c׹��U\P!(�/7�7�q?b�e��5����/G�=��^�S���E�T�h�ӯt��p8�]�����ZM�#��ĨB5&Q��5�������|��.�obt�������s�&�*W�����q�ˌ�!� o�5d�1#�����H,���x�/�M
��E&�s�<�ϝ�5��P��R�Eyl7c)��\���glx�Gɐ�������kQ$Mm}PM�nK���b�-�Dhf�����N�%��;��:b2���#�צ%�\�ЮeH��._uZ��d�ao\�|PևDZ��=�w^Z:�����Js���H9����.e'��m��M�߄MM���]�L<��?���cm\��*ȉ����g q��y����W��Bܝ�#7��v���3=�J�� 㷟�2��6Z�r�5
��!�> G��"�����F�~��k��F{^��QVL�_>(�?�&xE\��y���:Ǟ�>Ŀ�(8+Ilة�Z)��\�[      �   �   x�3估���.6_l��A��.l��W�¤;.�����paPp��vN�� .#���:�*�����h*2��l����Ә��|��V�8\������[�v6�pa�^�n_G?Gw� �=... �l      �   �   x�}�MN�0��ϧ�ٍ�(w�0)VH
�gO
T��{��)+$������Yq�]ܢF��bD/��c���|�� k��x��x�&^%��:�8��@�j��o	�9j!SQ��ƚBI8Œ�q�눎��YգN��q	��kru�~�e&��^q�Cf�4��B��JOLQ�3�¥� ΋[g!7^EK�|-��IS�S�G'����歏$��o��{�?	n9�ԗg\S�[r[�9K�1�����      �   n   x�5���0C��)� �R�����&`�)������d?��aE��	*��8�8�qpb@Q��s,���E������u���l5�<�#���|d�.��hk{=��z(W�      �   y   x�5��!C�P�<2��l�ul �B�����IYb�E�n9�B?����]�At7��59�L�ZW�_N��͇�~-q%��?��������R�d�ӵ�q�����ɷ�����d�"      �   �  x��V͎�6>KO��r(��!��� =-��=�$M�]���ö�v/E�^a�x���
����lK���2)��7�|3�I(	��2>���9��p��
?��I�軄4��Ќ*�����q���n��i3ӕ2���,��v�ᚱ�k�\��;ly�̧ػ+�b��,m��Y�
M��7�YF�O���y��<#����/�]X��Sf��v�����C��M��<��TEZ�>��ga�/c��=@�9����]Z&�6B�1F������</�iS��L{���6Xt��8��=�
�4x����E7�'�jDl���\VZ�V�I��p�7��8*RΤ2�m�-eU�R��h�����*����l�a%% ~
�;(u-�5���Հ�n�˸c����9h�+��ܜ�tA�)9�P2/�u��ǟ��~��_��i���D>�i�q��]<��P��8��?���*}_n���%�9k[����m�a<9C�@O�h����U��y��@yJ��}O���4��ҹ'�ͭMɰ�A�E<�	�	��EI,y�x6�3�@�G��.�������E�4�07<�{��~E�a��jq����I�5ݳ;n2Qs|�׏@��ja8(e�|�Z4� ʦ��()8���t�a�Y"Ŀ��ė�\��ް�ˮ5�`�0���w@����4Q��Ϋp�=�ᔨ�n����K,�7eV�2%;<Ŧ����+l�MwR������X@@�x�MNϳ��*38t(���z�5���T�ߒ�H�B�&��Qm��:ߴ��A-h�Ck��s>��d�s�mS+U�)fB��x#��B�q��]����k��.����7��^��|6rZ?���/��t��6*����Y��
�.»���ϒ�z	�:J�Ƞ����OP\�*�i����W��b�}E�+i�I?�#���Ƴ�<�;ߎ���{���Y ��4M���X�      �   �	  x��XKo��^���&�t �ὗ%�U7]̪�ng�"i���jg���4L�Zt�]u�$�$�c�/P���9��H[IL%���<���΃Ғ}KY�����å�r��uծr����Ѿo+���Y?�V�mu^]W��O՛�\��z��i���ݨ�t<V��(��U϶j���9���h��8uZu����j8�Z��#����[\��TݚgV-���x�ṪD���y�2���D=��vQ�����U�}��.���R0�"xB�G-jZ�fxó���HR9j���f4�[+n�Z�+X5J���g�OK1����<Gӡ��ĕ�<��$�y+.y�����c!�`;Ϳ=>���hQF��P��r'�G���k�+���"��x}mkK�ϙ._H9T�Ї�j����L�Q��w�۷����Q�\�� {�����}�xv��!��h�Fq*�x��:=I��0��la����A`�����5r�-D8���=[�.��q��$��E�I�.x�5+W)!�ЕC�����>q��Ky~W�YO7?�����h���۽�Ƃ�G^D�N��g^�� �����+S[ѹ��z�>#d����a��h�Dnp~��C70��ޣ�-:A�>)����?6��4������� ��~I�0��ca��v`�hl3�i�ڗ;_=&��aA��$�N���Z7��]��6��1�<p�
�'A���|zT&����sb���V� ��<ix~�=�������P������s��5�H⢴��6�1�>-A;���-���H�^� �[�d?�v��{Q�[xS��n/�U�%G�`&��p����������A���@��>�ӎ�Җ �d�̓4�E.�$�bQ�%�^.�(���p',�i^d�,�8�4����p��4N�,�H��a�Y�d�r2M��Y.�q���XfQ8M��8L�pi�\�,�8O�PL�a�c"��8Y��1�%�&S����$|�b8K�0��`1�x�0z�"�(�q�A�,9%�ereV�e"�f�8�f�BQ���"�g�2�x(D�������7�g���4Y,��,!���A&fQ�g�pc�XF�Y�Kq���6`�<�h��-5��Ȓef��B��(��&��h���!��Øxta�'
���;�9,EC{X�8�h&�8�a���+.7�d#�#�����,Ԋb�7�߁_E>�t�	X�1���j� o���^"s<J�e,T���a�D|���}mb�?P��?�M`�S���������qZ�~&b���}��3a
 Y��O8��6=��ǧs����3x�I��FO��ߖ-|2J�>T�5�vC�M�E�Y�V�e�v�&�6d���e$%���D'%&� x��I�̋=О$�A~��@3/S�8!����l�e: x������� ��0)r 25�0�B�1I�4/���4�GO�IB!���:�2��$J 8��9��p����IE��Y�qr*��;�$@Z��

�a�`M�KI%sl�HV�Ò�a�$?����C�(��P��}�S�6V(oQ6D�"RF���R�h`�if�^OF'�A��C#�z�Q�@6F��i�=���)�nҷ�1i�	��>��ٲ�-��d������q��l�L�c*D�K�sd<�"���S��.#��,
�9:�(;���OJ�r�KN("�����J��Vnu�u�G�w�W�<�`���z&�3��F��^ra�X��Tyѷ��y�����-���25���n27��#�.8�ڌ3)'X詩i�����$<��lE!��<����:�J�,z�6�"�[��.i��vտ@.�Y����N~���Z���;~�0��`J7�zN߳��L�]5�TF�r|շ�ky-d����i��	ƺ��P��z����o����q����`���!Pu�H�'�	��N��e�D������5��	j��O�&�}��:�z}Gy��m�b[��B�d���m�� �&tE��K��/���!ˇb��0��&g�[j��,LR�Ϡ��$�/���#�_���z�A}[�_Q��7����W����Y��Ž���4�z��)Q�r��
U�t��~s�����"Ƣ��͋�OfsR�s'����oyK0�Y@��(�S����!s�qz����m�`
Ёf�����9���֦�V�	od���B?�"������ͧ�{�u\��Z[�X�`!�!@�ob��Պm�5�2���W��_�w�8Lj���=������߫T���v�o<��I��m;܂r��6l,0���"_ �#�j�oT�g����ye�*XW�?��=�ؽm�)E(�󺾤�^�_�7���x}ek�|>��׿YM7?$9�jI˧\�4���R��K���}�G�&wi�u�j�q�P����B��(�Q0�^�2[��$������s|��``S`��q�~ϼ�m(�(S����c��碦      �   F   x�3�0��֋6]�q���ދ�v*\��qq�=���.�
�krq^��V@��=... �>�      �   �   x�u��!Fc���Y��+�
�+00����a�Hp8倛!��{<vQl>僀J�
0��	`����n�
g���5�5,8�b��|!�i	Wz��av�9fc���?l�2[G�-�$���lv����uK��ƍX�++`�Ff�^��޻eb�����{t�n~vv68�#ܚ�      �   �   x�U��q1��1�H��\�Z�a��]w��������i#v\p	{ę�,�`M���&�!�  �7XjK�RS�a��F��R�RSz|K������ۣ&A{�"�-e-'h�ڀޣ�oA{T��*@�Q,�=.K{����㲴��,�=���GZ>��������~Y#}�`B`�8`��MP����7�P�"(�Yj��Yj[�RS�f����3�x�Ή�      �   �   x�MPAj�0<�^�c�HvL��>&N �4��S���+��8���uV�;;3��XH!���[��=:L<��y���CO@kc��!�
���y�oh �����*��	��t�XA�/+�0�U���S\�f����DٞI^q���F��M�h�n2����Ī��	bi	>)=��w�ߏhmB�6��MRM��K�ol)|�t=�v֜������q����-����z�ʾWf�J$O6B.���9�>��k      �   �   x�-��� C��0�A�K���I	�<�0Q����B4)���ܤ���{�DE��.��5ĺ�9��������a����~�y���<FW�!'�3,�II���Зd����n��tب���My/ �%'�      �   F   x�3�0�bÅ�^أ�paׅ}�^l��|a�Ş�M6\l���b?��I6\��^������ �	(�      �   �   x�UNI�0;ϼ"/@b}�����s�h������փG�5�Tn�ȶ��"�Eg��v��9x��ĥu�m������e�^�;�T��15��U�d�����E拈�K��rG�4�,i���/�hJ_�d�vC��DU���k      �   �   x�=��zC0  ���9\��-�2�Ҵ[��F��R�ҧ��v�h�/�Ź��sE{UbW��!�l?�|��~���[-�/n�H�_��i��� �)��������Ύo�f����Ib�*�.kl�>�5N��h��I���u�4�0�Ce�^�.��]C�Ζ��J��G+�}[��,.��:�0y\S�]�Q�k(�$	RxR!�OvHO      �     x���[n�7���U佐AQ�z]� �.T �L��av_:qg#@㷍_�Χs��0�U�H>t�>6h��b��d��s�Vq"K6E��aGXG¡�ܧf�.[����< `+���ɉ��N�`oo��kk�z~xzx9|����j�Pr�V�,|��Q,�q�b;zAu�9e�9"1g%o���n�9T-v$5u�"l]�ҎL3�q΅q#��xl^��x���ϳ�8�x����Z����sH(/�D�Z�y{b٦�F^~�8�H���&m�Pjo�5ë7_A�+Қl �Œ̴-�_*�c;!������7G��D�ק���<��֎O���;Gf�{�)609h篥^�oW0g:�b�Ղy!�о���R,#�iCldҐ�
[]�*$
��
)P��E©���q�_��D�����X��iH��㦀Tc|�X{�6��H�z�2�B���T����V�VKO����>)�g�Mt�w`�i����4Ee�p����j�hG B��0Z��ov���Ҽ���{^�Mb�ݛ B�g��Kw˿إ�d��H�6�t�Z��5+sd!���Ug6�\)M�L��FEF���)E�g����H��痟?���"\A� ��Z\'�t<JΨ]��ݬ�v�}�է�jcwW�<d��<6ښ^e�K�`�3����a����k;���cw� ��f˭�����~x�Y���9ci��>�.���<(���<�
�D����i⥠Mw�� e��5G.l��!Tt_�Dv"82[��	���������K���)o����xww�/h�q     